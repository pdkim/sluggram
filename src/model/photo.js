import * as _ from 'ramda'
import * as util from '../lib/util.js'
import createError from 'http-errors'
import Mongoose, {Schema} from 'mongoose'

const photoSchema = new Schema({
  url: {type: String, required: true},
  description: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, required: true},
  profile: {type: Schema.Types.ObjectId: required: true, ref: 'profile'},
  comments: [{type: Schema.Types.ObjectId}],
})

const Photo = Mongoose.model('photo', photoSchema) 

Photo.validateRequest = function(req){
  if(req.method === 'POST' && !req.files)
    return Promise.reject(createError(400, 'VALIDATION ERROR: must have a file'))

  if(req.files.length < 1) {
    let err = createError(400, 'VALIDATION ERROR: must have one file')
    return util.removeMulterFiles(req.files)
    .then(() => {throw err})
  }

  let [file] = req.files
  if(file.fieldname !== 'photo'){
    let err = createError(400, 'VALIDATION ERROR: file must be on field photo')
    return util.removeMulterFiles(req.files)
    .then(() => {throw err})
  }

  return Profile.resolve(file)
}

Photo.create = function(req){
  return Photo.validateRequest(req)
  .then(file => {
    s3UploadMulterFileAndClean(file)
    .then(s3Data => {
      return new Photo({
        owner: req.user._id,
        profile: req.user.profile,
        url: s3Data.Location,
        description: req.body.description,
      }).save()
    })
  })
}

Photo.getPage = util.pagerCreate(Photo)

Photo.update = function(req){
  return Promise.reject(createError(666, 'wat'))
}

Photo.delete = function(req){
  return Promise.reject(createError(666, 'wat'))
}


