'use strict'

const mongoose = require('mongoose')
mongoose.Promise = Promise 
const state = { isOn: false }

export const start = (uri) => {
  console.log('__DB_UP__', uri)
  if(state.isOn)
    return Promise.reject(new Error('USER ERROR: db is connected'))
  state.isOn = true
  return mongoose.connect(uri, {useMongoClient: true})
}

export const stop = () => {
  console.log('__DB_DOWN__')
  if(!state.isOn)
    return Promise.reject(new Error('USER ERROR: db is disconnected'))
  state.isOn = false
  return mongoose.disconnect()
}
