import dotenv from 'dotenv'
import {start} from './lib/server.js'

dotenv.config({path: `${__dirname}/../.env`})
start({PORT: process.env.PORT, MONGO_URI: process.env.MONGO_URI})  
