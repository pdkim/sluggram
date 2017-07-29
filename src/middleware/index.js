'use strict'

// DEPENDENCIES
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import routerAuth from './router-auth.js'
import fourOhFour from './four-oh-four.js'
import errorHandler from './error-handler.js'

// INTERFACE
export default [
  // GLOBAL MIDDLEWARE
  cors(),
  cookieParser(),
  // ROUTERS 
  routerAuth,
  // ERROR HANDLERS
  fourOhFour, 
  errorHandler,
]
