const express = require('express')
const router = express.Router()

const intervals = require('../models/intervals')

router.get('/', (req, res) => {
  return res.json(intervals)
})

module.exports = router

