import * as db from '../lib/db.js'

describe('db', () => {
  test('#start and #stop should not reject', () => {
    return db.start({MONGO_URI: 'mongodb://localhost/testing'})
    .then(() => db.stop())
  })
})
