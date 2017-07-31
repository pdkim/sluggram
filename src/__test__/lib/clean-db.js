import User from '../../model/user.js'
import Profile from '../../model/profile.js'

export default () => 
  Promise.all([
    User.remove({}),
    Profile.remove({}),
  ])

