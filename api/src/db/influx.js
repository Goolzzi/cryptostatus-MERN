const Influx = require('influx')
const config = require('../config').influx
const Logger = require('../utils/logger')

const summarySchema = require('../models/marketSummary')

async function init() {
  const influx = new Influx.InfluxDB(config)

  try {
    const influxDatabases = await influx.getDatabaseNames()

    if (!influxDatabases.includes(config.database)) {
      influx.createDatabase(Object.assign(config.database, {
        schema: [ summarySchema ],
      }))
    }

    return influx
  } catch (e) {
    return Logger.error('Unable to initialize InfluxDB', e)
  }
}

module.exports = {
  init,
}

