'use strict'

const server = require('../lib/server.js')

describe('server', () => {
    test('#start and #stop should not reject', () => {
      return server.start({
        PORT: 5000, 
        MONGO_URI: 'mongodb://localhost/testing'
      })
      .then(() => server.stop())
    })
})
