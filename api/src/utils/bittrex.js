const bittrex = require('node-bittrex-api')
const Logger = require('./logger')

function BittrexClient(options, db) {
  bittrex.options(options)

  this.options = options
  this.db = db

  return this
}

BittrexClient.prototype.connect = function() {
  return this.getMarkets()
}

BittrexClient.prototype.getMarkets = function() {
  return bittrex.getmarkets((data, err) => {
    if (err) {
      return Logger.error('BittrexClient cannot get markets', err)
    }

    const marketStatCreationTasks = data
      .result
      .filter(item => item.MarketName.startsWith('BTC'))
      .map(item => this.db.createMarketStats(item))

    return Promise
      .all(marketStatCreationTasks)
      .then(() => this.listenSocket())
      .catch(err => Logger.error(err))
  })
}

BittrexClient.prototype.getMarketSummaries = function() {
  return bittrex.getmarketsummaries((data, err) => {
    if (err) {
      return Logger.error(err)
    }

    const marketHistoryCreationTasks = data
      .result
      .filter(item => item.MarketName.startsWith('BTC'))
      .map(item => this.db.createMarketSummary(item))

    return Promise
      .all(marketHistoryCreationTasks)
      .then(() => this.listenSocket())
      .catch(err => Logger.error(err))
  })
}

BittrexClient.prototype.listenSocket = function() {
  const socketClient = bittrex.websockets.listen((data) => {
    if (data.M === 'updateSummaryState') {
      data.A.forEach((dataFor) => {
        dataFor
          .Deltas
          .filter(item => item.MarketName.startsWith('BTC'))
          .forEach(item => this.db.createMarketSummary(item))
      })
    }
  })
}

module.exports = BittrexClient

