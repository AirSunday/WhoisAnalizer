require('dotenv').config()
module.exports = {
    secret: 'whoissecret',
    session: { session: false },
    database: process.env.MONGO_URI, 
  }