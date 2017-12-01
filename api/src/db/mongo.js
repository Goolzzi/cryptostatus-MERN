const mongoose = require('mongoose')
const config = require('../config').mongo
const Logger = require('../utils/logger')

mongoose.Promise = global.Promise

async function init() {
  try {
    return await mongoose.connect(config.uri)
  } catch (e) {
    return Logger.error('Unable to initialize mongo', e)
  }
}

module.exports = {
  init,
}

