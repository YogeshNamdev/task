import { app } from './app.js'
import { connenctDb } from './data/database.js'

connenctDb()

app.listen(process.env.PORT, () => {
  console.log(
    `server is working on port :${process.env.PORT} in ${process.env.NODE_ENV} mode`
  )
})
