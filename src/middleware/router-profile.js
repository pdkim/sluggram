import {Router} from 'express'
import createError from 'http-errors'
import parserBody from './parser-body.js'
import Profile from '../model/profile.js'
import {bearerAuth} from './parser-auth.js'

export default new Router()
.post('/profiles', bearerAuth, parserBody, (req, res, next) => {
   Profile.create(req)
  .then(res.json)
  .catch(next)
})
.get('/profiles', (req, res, next) => {
  Profile.fetch(req)
  .then(res.json)
  .catch(next)
})
.get('/profiles/:id', (req, res, next) => {
  Profile.fetchOne(req)
  .then(res.json)
  .catch(next)
})
.put('/profiles/:id', bearerAuth, parserBody, (req, res, next) => {
  Profile.update(req)
  .then(res.json)
  .catch(next)
})
.delete('/profiles/:id', bearerAuth, (req, res, next) => {
  Profile.delete(req)
  .then(() => res.sendStatus(204))
  .catch(next)
})
