const Winston = require('winston')
const SlackHook = require('winston-slack-hook')

const Logger = new Winston.Logger({
  transports: [
    new SlackHook({
      hookUrl: 'https://hooks.slack.com/services/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',
      username: 'cryptostats-api',
      channel: '#cryptostats',
    }),
  ]
})

module.exports = Logger

