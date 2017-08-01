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
  Profile.getPage(req)
  .then(profiles => res.json(profiles))
  .catch(next)
})
.get('/profiles/:id', (req, res, next) => {
  Profile.findById(req.params.id)
  .then(profile => {
    if(!profile)
      throw createError(404, 'NOT FOUND ERROR: profile not found') 
    res.json(profile)
  })
  .catch(next)
})
.put('/profiles/:id', bearerAuth, parserBody, (req, res, next) => {
  Profile.update(req)
  .then(profile => res.json(profile))
  .catch(next)
})
.delete('/profiles/:id', bearerAuth, (req, res, next) => {
  Profile.findByIdAndRemove(req.params.id)
  .then(profile => {
    if(!profile)
      throw createError(404, 'NOT FOUND ERROR: profile not found')
    res.sendStatus(204)
  })
  .catch(next)
})
