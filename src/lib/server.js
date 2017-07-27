'use strict'

import * as db from './db'
import express from 'express'
import middleware from '../middleware'
import {log, logError} from './util.js'

const app = express().use(middleware)

const state = {
  isOn: false, 
  http: null,
}

export const start = ({PORT, MONGO_URI}) => {
  return new Promise((resolve, reject) => {
    if (state.isOn) 
      return reject(new Error('USAGE ERROR: the state is on'))
    state.isOn = true
    db.start({MONGO_URI})
    .then(() => {
      state.http = app.listen(PORT, () => {
        log('__SERVER_UP__', PORT)
        resolve()
      })
    })
    .catch(reject)
  })
}

export const stop = () => {
  return new Promise((resolve, reject) => {
    if(!state.isOn)
      return reject(new Error('USAGE ERROR: the state is off'))
    return db.stop()
    .then(() => {
      state.http.close(() => {
        log('__SERVER_DOWN__')
        state.isOn = false
        state.http = null
        resolve()
      })
    })
    .catch(reject)
  })
}
