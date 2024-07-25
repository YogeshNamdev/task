import express from 'express'
import { getMyDetail, login, logout, register } from '../controllers/users.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.post('/new', register)
router.post('/login', login)
router.post('/logout', logout)

router.get('/me', isAuthenticated, getMyDetail)

export default router
