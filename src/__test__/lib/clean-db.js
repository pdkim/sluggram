import fs from 'fs-extra'
import User from '../../model/user.js'
import Profile from '../../model/profile.js'

export default () => 
  Promise.all([
  fs.remove(`${__dirname}/../../../temp/*`),
    User.remove({}),
    Profile.remove({}),
  ])

