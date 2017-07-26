'use stirct'

const db = require('../lib/db')
const {compare} = require('bcrypt')
const User = require('../model/user.js')

const MONGODB_URI = 'mongodb://localhost/testing'

describe('USER', () => {
  beforeAll(() => db.start(MONGODB_URI))
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

    test('should reject with no username data', () => {

    })
  })


})
