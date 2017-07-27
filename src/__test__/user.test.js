'use stirct'

import * as db from '../lib/db.js'
import {compare} from 'bcrypt'
import User from '../model/user.js'

const MONGO_URI = 'mongodb://localhost/testing'

describe('USER', () => {
  beforeAll(() => db.start({MONGO_URI}))
  afterAll(db.stop)
  afterEach(() => User.remove({}))

  describe('%create', () => {
    test('should not reject with valid data', () => {
      let data = {
        username: 'testuser', 
        password: 'abcd1234',
        email: 'testuser@example.com'
      }

      return User.create(data)
      .then(user => {
        expect(user._id).toBeTruthy()
        expect(user.passwordHash).toBeTruthy()
        expect(user.username).toEqual(data.username)
        expect(user.email).toEqual(data.email)
        expect(user.randomHash).toBe('')
        return compare(data.password, user.passwordHash)
      })
      .then(success => {
        expect(success).toBeTruthy()
      })
    })

    test('should reject with no invalid data', () => {
      let data = {
        username: 'testuser', 
        password: 'abcd1234',
        email: 'testuser@example.com'
      }

      return Promise.all([
        User.create({...data, username: undefined}).catch(err => err),
        User.create({...data, email: undefined}).catch(err => err),
        User.create({...data, password: undefined}).catch(err => err),
      ])
      .then(errors => {
        errors.forEach(err => {
          expect(err).toBeInstanceOf(Error)
          expect(err.status).toBe(400)
        })
      })
    })
  })
})
