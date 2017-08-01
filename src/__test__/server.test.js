'use strict'

const server = require('../lib/server.js')

describe('server', () => {
    test('#start and #stop should not reject', () => {
      return server.start()
      .then(() => server.stop())
    })
})
