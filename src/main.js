import server from './lib/server.js'
import * as db from './lib/db.js'
const app = server(process.env.PORT)

db.start()
.then(() => {
  return app.start()  
})
