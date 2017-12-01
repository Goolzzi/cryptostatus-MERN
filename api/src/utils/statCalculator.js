const moment = require('moment')

function calculatePercentChange(newValue, oldValue) {
  let val

  if (newValue > oldValue) {
    val = (((newValue - oldValue) / oldValue) * 100).toFixed(2)
  } else {
    val = (-((oldValue - newValue) / oldValue) * 100).toFixed(2)
  }

  val == (val === '-0.00') ? '0.00' : val

  return Number(val)
}

function calculateStats(lastItem, firstItem) {
  if (firstItem) {
    delete firstItem.market

    return {
      priceChange: calculatePercentChange(lastItem.price, firstItem.price),
      volumeChange: calculatePercentChange(lastItem.volume, firstItem.volume),
      baseSummary: firstItem,
    }
  }

  return {}
}

module.exports = calculateStats

