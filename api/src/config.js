module.exports = {
  influx: {
    database: 'cryptostats',
    host: process.env.INFLUX_HOST,
  },
  mongo: {
    uri: process.env.MONGO_URI,
  },
  amazonSes: {
    auth: {
      user: 'AKIAJFV37SKTHHKKHDFQ',
      pass: 'Am9OTgzt9klvlxNEte97LyoXwx9DxIZfk4Lvz3oETzEV',
    },
    host: 'email-smtp.eu-west-1.amazonaws.com',
    port: 465,
  },
  contact: {
    from: 'hello@cryptostats.io',
    to: ['altay.aydemir@gmail.com', 'Team@barbar.digital'],
  },
}

