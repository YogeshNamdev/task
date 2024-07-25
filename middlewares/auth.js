import jwt from 'jsonwebtoken'
import { User } from '../models/users.js'

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookie
  if (!token)
    return res.status(404).json({
      success: false,
      message: 'Login First',
    })

  const decoded = await jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(decoded._id)
  next()
}
