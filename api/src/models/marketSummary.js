const Influx = require('influx')

module.exports = {
  measurement: 'summaries',
  fields: {
    market: Influx.FieldType.STRING,
    price: Influx.FieldType.FLOAT,
    volume: Influx.FieldType.FLOAT,
    timeStamp: Influx.FieldType.STRING,
  },
  tags: [
    'market',
  ],
}

