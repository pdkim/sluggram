'use strict'

// DEPENDECIES
import * as bcrypt from 'bcrypt'
import {randomBytes} from 'crypto'
import * as jwt from 'jsonwebtoken'
import createError from 'http-errors'
import Mongoose, {Schema} from 'mongoose'

// SCHEMA
const userSchema =  new Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true},
  randomHash: {type: String,  unique: true, default: ''},
})

// INSTANCE METHODS
userSchema.methods.passwordCompare = function(password){
  return bcrypt.compare(password, this.passwordHash)
  .then(success => {
    if (!success)
      throw createError(401, 'USER ERROR: wrong password')
    return this
  })
}

userSchema.methods.tokenCreate  = function(){
  this.randomHash = randomBytes(32).toString('base64')
  return this.save()
  .then(user => {
    return jwt.sign({randomHash: this.randomHash}, process.env.SECRET)
  })
}

// MODEL
const User = Mongoose.model('user', userSchema)

// STATIC METHODS
User.create = function (user) {
  let {password} = user
  user = Object.assign({}, user, {password: undefined})

  return bcrypt.hash(password, 1)
  .then(passwordHash => {
    let data = Object.assign({}, user, {passwordHash}) 
    return new User(data).save()
  })
  .catch(err => createError(400, err.message))
}

// INTERFACE
export default User
