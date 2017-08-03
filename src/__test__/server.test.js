'use strict'

const server = require('../lib/server.js')

const app = server(4004)
describe('server', () => {
    test('#start and #stop should not reject', () => {
      return app.start()
      .then(() => app.stop())
    })
})
