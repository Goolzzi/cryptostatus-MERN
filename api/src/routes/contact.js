const express = require('express')
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('../config')

const router = express.Router()
const transport = nodemailer.createTransport(smtpTransport(Object.assign(config.amazonSes, {
  secure: true,
})))

transport.verify(function(error, success) {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is ready to take our messages')
  }
})

router.post('/', (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(422).json({
      error: 'All fields are required',
    })
  }

  transport.sendMail({
    from: config.contact.from,
    to: config.contact.to,
    subject: `CryptoStats: Message received from ${name}`,
    text: message,
    replyTo: email,
  }, (err, data) => {
    if (err) {
      return res.status(400).send(err)
    }

    return res.json({
      data,
      status: 'ok',
    })
  })
})

module.exports = router

