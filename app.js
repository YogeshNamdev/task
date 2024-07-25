import express from 'express'

import userRoutes from './routes/users.js'
import taskRoutes from './routes/task.js'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middlewares/error.js'
import cors from 'cors'
export const app = express()

config({
  path: './data/config.env',
})
//using Middle Ware
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/task', taskRoutes)

app.use(errorMiddleware)
