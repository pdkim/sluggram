'use strict'

// DEPENDENCIES
import * as db from './db.js'
import express from 'express'
import middleware from '../middleware'
import {log, logError} from './util.js'

// STATE
export default (port) => {
  const state = {
    http: null,
    isOn: false, 
  }

    // INTERFACE 
  return {
    start: () => {
      return new Promise((resolve, reject) => {
        if (state.isOn) 
          return reject(new Error('USAGE ERROR: the state is on'))
        let app = express().use(middleware)
        return db.start()
        .then(() => {
          state.http = app.listen(port, (err) => {
            if(err)
              return reject(err)
            state.isOn = true
            log('__SERVER_UP__', port)
            resolve()
          })
        })
      })
    },
    stop: () => {
      return new Promise((resolve, reject) => {
        if(!state.isOn)
          return reject(new Error('USAGE ERROR: the state is off'))
        return db.stop()
        .then(() => {
          state.http.close((err) => {
            if(err)
              return reject(err)
            log('__SERVER_DOWN__')
            state.isOn = false
            state.http = null
            resolve()
          })
        })
      })
    },
  }
}
