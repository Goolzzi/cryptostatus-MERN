const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const WebSocket = require('ws');

const Mongo = require('./db/mongo')
const Influx = require('./db/influx')

const Kempo = require('./kempo')
const BittrexClient = require('./utils/bittrex')
const CoinMarketCapClient = require('./utils/coinMarketCap')
const Logger = require('./utils/logger')

const markets = require('./routes/markets')
const intervals = require('./routes/intervals')
const contact = require('./routes/contact')
const user = require('./routes/user')

const app = express()
const server = http.createServer(app)

// WSS
const wss = new WebSocket.Server({ server })

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

// Express
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
  next()
})

app.use('/v1/markets', markets)
app.use('/v1/intervals', intervals)
app.use('/v1/contact', contact)
app.use('/v1/user', user)

// Init
async function init() {
  try {
    const mongo = await Mongo.init()
    const influx = await Influx.init()

    const kempo = new Kempo({
      wss,
      influx,
    })

    const bittrex = new BittrexClient({
      apikey: '020b573da10c45f6b9bc834a5ef96231',
      apisecret: '25d97fffd55b42bb95c8d266199ecd1d',
    }, kempo)

    const coinMarketCap = new CoinMarketCapClient({}, kempo)

    bittrex.connect()

    coinMarketCap.connect()

    return server.listen(8000)
  } catch (e) {
    return Logger.error('Unable to initialize app', e)
  }
}

init()

