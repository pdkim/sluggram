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
  let page = Number(req.query.page) || 1
  Profile.getPage(page > 0 ? page : 1)
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
  .then(profile => res.json)
  .catch(next)
})
