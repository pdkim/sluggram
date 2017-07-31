import * as util from '../lib/util.js'
import Mongoose, {Schema} from 'mongoose'

const profileScheama = new Schema({
  owner: {type: Schema.Types.ObjectId, required: true},
  email: {type: String, required: true},
  username: {type: String, required: true},
  avatar: {type: String},
  bio: {type: String},
})

const Profile = Mongoose.model('profile', profileScheama)

Profile.createProfileWithPhoto = function(req){
  if(req.files.length > 1){
    return util.removeMulterFiles(req.files)
    .then(() => {
      throw createError(400, 'VALIDATION ERROR: only one file permited')
    })
  }

  let [file] = req.files
  if(file)
    if(file.fieldname !== 'avatar')
      return Promise.reject(createError(400, 'VALIDATION ERROR: file must be for avatar'))

  return util.s3UploadMulterFileAndClean(file)
  .then((s3Data) => {
    return new Profile({
      owner: req.user._id,
      username: req.user.username, 
      email: req.user.email,
      bio: req.body.bio,
      avatar: s3Data.Location,
    }).save()
  })
}

Profile.create = function(req){
  if(req.files){
    return Profile.createProfileWithPhoto(req)
  }

  return new Profile({
    owner: req.user._id,
    username: req.user.username, 
    email: req.user.email,
    bio: req.body.bio,
  }).save()
}

Profile.getPage = function(num=1){
  num--
  let pageCount = 100
  return Profile.find({})
  .skip(num * pageCount)
  .limit(pageCount)
}

Profile.updateProfileWithPhoto = function(req) {
}

Profile.update = function(req){
  if(req.files)
    return updateProfileWithPhoto(req)
  let options = {new: true, runValidators: true}
  return Profile.findByIdAndUpdate(req.params.id, {bio: req.body.bio}, options)
}

export default Profile
