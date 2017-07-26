'use strict'

const db = require('./db.js')
const express = require('express')
const middleware = require('../middleware')

const app = express()
app.use(middleware)

const server = module.exports = {
  isOn: false, 
  http: null,
}

server.start = (config) => {
    return new Promise((resolve, reject) => {
      if (server.isOn) 
        return reject(new Error('USAGE ERROR: the server is on'))
      server.isOn = true
      db.start(config.MONGO_URI)
      .then(() => {
        server.http = app.listen(config.PORT, () => {

          console.log('__SERVER_UP__', config.PORT)
          resolve()
        })
      })
      .catch(reject)
    })
}

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn)
      return reject(new Error('USAGE ERROR: the server is off'))
    return db.stop()
    .then(() => {
      server.http.close(() => {
        console.log('__SERVER_DOWN__')
        server.isOn = false
        server.http = null
        resolve()
      })
    })
    .catch(reject)
  })
}
