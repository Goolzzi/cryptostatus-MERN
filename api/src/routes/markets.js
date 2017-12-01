const express = require('express')
const moment = require('moment')
const router = express.Router()

const MarketStats = require('../models/marketStats')

router.get('/stats', (req, res) => {
  return MarketStats
    .find({ isActive: true })
    .exec((err, marketStats) => {
      if (err) {
        res.send(err)
      }

      const stats = marketStats
      const latestUpdate = marketStats.sort((a, b) => moment(a) < moment(b))[0].receivedAt

      res.json({
        btcPrice: global.btcPrice,
        latestUpdate,
        stats,
      })
    })
})

module.exports = router

