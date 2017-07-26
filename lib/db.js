'use strict'

const mongoose = require('mongoose')
mongoose.Promise = Promise 

const db = module.exports = {}

db.start = (uri) => {
  console.log('__DB_UP__', uri)
  return mongoose.connect(uri, {useMongoClient: true})
}

db.stop = () => {
  console.log('__DB_DOWN__')
  return mongoose.disconnect()
}
