import {Router} from 'express'
import {bearerAuth} from './parser-auth.js'
import parserBody from './parser-body.js'
import Photo from '../model/photo.js'

export default new Router()
.post('/photos', bearerAuth, parserBody, (req, res, next) => {
  Photo.create(req)
  .then(photo => res.json(photo))
  .catch(next)
})
