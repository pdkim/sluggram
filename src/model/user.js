'use strict'

// DEPENDECIES
const {randomBytes} = require('crypto')
const {hash, compare} = require('bcrypt')
const createError = require('http-errors')
const {Schema } = require('mongoose')
const mongoose = require('mongoose')
mongoose.Promise = Promise

// SCHEMA
const userSchema =  new Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true},
  randomHash: {type: String,  unique: true, default: ''},
})

userSchema.methods.passwordCompare = (password) => {
  return bcrypt.compare(password, this.passwordHash)
  .then(success => {
    if (!success)
      throw createError(401, 'USER ERROR: wrong password')
  })
}

userSchema.methods.tokenCreate  = () => {
  return new Promise((resolve, reject) => {
    this.randomHash = randomBytes(32).toString('base64')
    this.save()
    .then(user => 
      jwt.sign({randomHash}, process.env.APP_SECRET))
  })
}

// MODEL
const User = mongoose.model('user', userSchema)

User.create = (user) => {
  let {password} = user
  user = Object.assign({}, user, {password: undefined})

  return hash(password, 1)
  .then(passwordHash => {
    let data = Object.assign({}, user, {passwordHash}) 
    return new User(data).save()
  })
}

export default User
