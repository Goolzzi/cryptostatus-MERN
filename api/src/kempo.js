const Influx = require('influx')

const moment = require('moment')
const deepAssign = require('assign-deep')

const MarketSummary = require('./models/marketSummary')
const MarketStats = require('./models/marketStats')
const intervals = require('./models/intervals')

const calculateStats = require('./utils/statCalculator')
const Logger = require('./utils/logger')

function Kempo(options) {
  this.wss = options.wss
  this.influx = options.influx
}

Kempo.prototype.createMarketStats = function(data) {
  return MarketStats
    .findOne({ marketName: data.MarketName })
    .exec((err, marketStats) => {
      if (!marketStats) {
        marketStats = new MarketStats()
        marketStats.marketName = data.MarketName
        marketStats.stats = {}
      }

      marketStats.marketCurrency = {
        short: data.MarketCurrency,
        long: data.MarketCurrencyLong,
      }

      marketStats.baseCurrency = {
        short: data.BaseCurrency,
        long: data.BaseCurrencyLong,
      }

      marketStats.marketLogoURL = data.LogoUrl

      return marketStats.save((err, result) => {
        if (err) {
          return Logger.error('Error while creating market stat', err)
        }

        return result
      })
    })
}

Kempo.prototype.createMarketSummary = function(data) {
  const timeStamp = moment(data.TimeStamp)

  this.influx.writePoints([{
    measurement: 'summaries',
    fields: {
      price: data.Last,
      volume: data.Volume,
    },
    tags: {
      market: data.MarketName,
    },
    timeStamp: timeStamp.toISOString(),
  }])
    .then(() => {
      const stats = {}

      const lastSummary = {
        market: data.MarketName,
        price: data.Last,
        volume: data.Volume,
        baseVolume: data.BaseVolume,
        time: timeStamp.toISOString(),
      }

      const statCalculations = intervals.map((interval) => {
        const { qty, type } = interval
        const timeStamp = moment(data.TimeStamp).subtract(qty, type).toISOString()

        return this.influx
          .query(`
            select * from summaries where
            market=${Influx.escape.stringLit(data.MarketName)} and
            time<='${timeStamp}'
            order by time desc
            limit 1
          `)
      })

      return Promise
        .all(statCalculations)
        .then((summaries) => {
          summaries.forEach((item, index) => {
            const { qty, type } = intervals[index]
            const intervalShort = `${qty}${type}`

            return stats[intervalShort] = calculateStats(lastSummary, item[0])
          })

          return this.setMarketStats(lastSummary, stats)
        })
        .catch(err => Logger.error('Stat Calculation Error', err))
    })
}

Kempo.prototype.setMarketStats = function(lastSummary, stats) {
  return MarketStats
    .findOne({ marketName: lastSummary.market })
    .exec((err, marketStats) => {
      if (!marketStats) {
        marketStats = new MarketStats()
        marketStats.marketName = lastSummary.market
        marketStats.stats = {}
      }

      marketStats.stats = deepAssign({}, marketStats.stats, stats)
      marketStats.currentPrice = lastSummary.price
      marketStats.currentVolume = Number((lastSummary.baseVolume).toFixed(2))
      marketStats.receivedAt = lastSummary.time

      return marketStats.save((err, result) => {
        if (err) {
          return Logger.error('Error while updating market stat', err)
        }

        return result
      })
    })
}

Kempo.prototype.setMarketCap = function(data) {
  const marketName = `BTC-${data.symbol}`

  return MarketStats
    .findOne({ marketName })
    .exec((err, marketStats) => {
      if (!marketStats) {
        return
      }

      const marketCap = Number(data.market_cap_usd)

      if (marketStats.currentMarketCap === marketCap) {
        return
      }

      return marketStats.update({ currentMarketCap: marketCap }, (err, result) => {
        if (err) {
          return Logger.error('Error while updating market stat', err)
        }

        return result
      })
    })
}

module.exports = Kempo

