const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MarketStatsSchema = new Schema({
  marketName: {
    type: String,
    required: true,
  },
  marketLogoURL: {
    type: String,
  },
  marketCurrency: {
    short: {
      type: String,
      required: true,
    },
    long: {
      type: String,
      required: true,
    },
  },
  baseCurrency: {
    short: {
      type: String,
      required: true,
    },
    long: {
      type: String,
      required: true,
    },
  },
  currentPrice: {
    type: Number,
    default: 0,
  },
  currentVolume: {
    type: Number,
    default: 0,
  },
  currentMarketCap: {
    type: Number,
    default: 0,
  },
  stats: {
    type: Schema.Types.Mixed,
    default: {},
  },
  receivedAt: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  minimize: false,
})

module.exports = mongoose.model('MarketStats', MarketStatsSchema)

