import User from '../../model/user.js'

export default () => 
  Promise.all([
    User.remove({}),
  ])

