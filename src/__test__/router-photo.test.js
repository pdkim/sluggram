import * as _ from 'ramda'
import cleanDB from './lib/clean-db.js'
import * as server from '../lib/server.js'
import {mockUser} from './lib/mock-user.js'
import {mockProfile} from './lib/mock-profile.js'

describe('router-photo.test.js', () => {
  before(server.start)
  after(server.stop)
  afterEach(cleanDB)
  test('yooll', () => {
    expect(true).toEqual(true)
  })
})
