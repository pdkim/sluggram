import multer from 'multer'
import bodyParser from 'body-parser'
import createError from 'http-errors'

const upload = multer({dest: `${__dirname}/../../temp`})

export default (fields) => (req, res, next) => {
  let contentType = req.headers['content-type']
  switch(contentType){
    case 'application/json':
      return bodyParser.json()(req, res, next)
    case 'application/x-www-form-urlencoded':
      return bodyParser.urlencoded()(req, res, next)
    case 'multipart/form-data':
      if(!fields)
        return next(createError(500, 'SERVER ERROR: multer fields not configured'))
      return upload.fields(fields)(req, res, next)
    default:
      next(createError(400, 
        `VALIDATION ERROR: content-type (${contentType}) not supported`))
  }
}
