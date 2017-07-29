import {logError} from '../lib/util.js'

// INTERFACE
export default (err, req, res, next) => {
  logError(err)
  if(err.status)
    return res.sendStatus(err.status)

  res.sendStatus(500)
}
