import {Router} from 'express'
import createError from 'http-errors'
import parserBody from './parser-body.js'
import Profile from '../model/profile.js'
import {bearerAuth} from './parser-auth.js'

export default new Router()
.post('/profiles', bearerAuth, parserBody, (req, res, next) => {
   Profile.create(req)
  .then((profile) => res.send(profile))
  .catch(next)
})
.get('/profiles', (req, res, next) => {
  Profile.fetch(req)
  .then(profiles => res.json(profiles))
  .catch(next)
})
.get('/profiles/:id', (req, res, next) => {
  Profile.fetchOne(req)
  .then(profile => res.json(profile))
  .catch(next)
})
.put('/profiles/:id', bearerAuth, parserBody, (req, res, next) => {
  Profile.update(req)
  .then(profile => res.json(profile))
  .catch(next)
})
.delete('/profiles/:id', bearerAuth, (req, res, next) => {
  Profile.delete(req)
  .then(() => res.sendStatus(204))
  .catch(next)
})
