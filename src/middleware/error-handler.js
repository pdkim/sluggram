import {logError} from '../lib/util.js'

// INTERFACE
export default (err, req, res, next) => {
  console.log(err)
  logError(err)
  if(err.status)
    return res.sendStatus(err.status)

  res.sendStatus(500)
}
