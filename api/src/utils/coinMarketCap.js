const request = require('request-promise')
const Logger = require('./logger')

function CoinMarketCapClient(options, db) {
  this.options = options
  this.db = db
}

CoinMarketCapClient.prototype.connect = function() {
  return this.pollTickers()
}

CoinMarketCapClient.prototype.pollTickers = function() {
  const options = {
    method: 'GET',
    uri: 'https://api.coinmarketcap.com/v1/ticker',
    json: true,
  }

  return request(options)
    .then((res) => {
      global.btcPrice = Number(res.find(item => item.symbol === 'BTC').price_usd)
      res.forEach(ticker => this.db.setMarketCap(ticker))
      return setTimeout(() => this.pollTickers(), 1000 * 60 * 5)
    })
    .catch(err => Logger.error('Unable to get marketCaps', err))
}

module.exports = CoinMarketCapClient

