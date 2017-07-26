'use strict'

const mongoose = require('mongoose')
mongoose.Promise = Promise 

const db = module.exports = { isOn: false }

db.start = (uri) => {
  console.log('__DB_UP__', uri)
  if(db.isOn)
    return Promise.reject(new Error('USER ERROR: db is connected'))
  db.isOn = true
  return mongoose.connect(uri, {useMongoClient: true})
}

db.stop = () => {
  console.log('__DB_DOWN__')
  if(!db.isOn)
    return Promise.reject(new Error('USER ERROR: db is disconnected'))
  return mongoose.disconnect()
}
