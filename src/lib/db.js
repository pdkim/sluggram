'use strict'

// DEPENDENCIES
import {log, error} from './util.js'
const mongoose = require('mongoose')
mongoose.Promise = Promise 

// STATE
const state = { 
  isOn: false,
  count: 0,
}

// INTERFACE
export const start = () => {
  log('__DB_UP__', process.env.MONGO_URI)
  if(state.isOn)
    return Promise.reject(new Error('USER ERROR: db is connected'))
  state.isOn = true
  state.count ++
  return mongoose.connect(process.env.MONGO_URI, {useMongoClient: true})
}

export const stop = () => {
  log('__DB_DOWN__')
  if(--state.count)
    return Promise.resolve()
  if(!state.isOn)
    return Promise.reject(new Error('USER ERROR: db is disconnected'))
  state.isOn = false
  return mongoose.disconnect()
}
