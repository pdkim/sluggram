'use strict'

// DEPENDENCIES
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import routerAuth from './router-auth.js'
import fourOhFour from './four-oh-four.js'
import errorHandler from './error-handler.js'
import routerProfile from './router-profile.js'

// INTERFACE
export default [
  // GLOBAL MIDDLEWARE
  cors(),
  cookieParser(),
  // ROUTERS 
  routerAuth,
  routerProfile,
  // ERROR HANDLERS
  fourOhFour, 
  errorHandler,
]
