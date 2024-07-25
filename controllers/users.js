import { User } from '../models/users.js'
import bcrypt from 'bcrypt'

import { sendCookie } from '../utils/features.js'
import ErrorHandler from '../middlewares/error.js'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    let user = await User.findOne({ email })
    if (user) return next(new ErrorHandler('User already Exist'), 404)

    const hashPassword = await bcrypt.hash(password, 10)
    await User.create({
      name,
      email,
      password: hashPassword,
    })

    sendCookie(user, res, 'Registered SuccessFully', 201)
  } catch (error) {
    next(error)
  }
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      email,
    }).select('+password')
    if (!user) return next(new ErrorHandler('Invalid Email or Password'), 404)

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return next(new ErrorHandler('Invalid Email or Password'), 404)

    sendCookie(user, res, `Welcome back ${user.name} `, 200)
  } catch (error) {
    next(error)
  }
}

export const logout = (req, res) => {
  res
    .status(200)
    .cookie('token', '', {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === 'DEVELOPMENT' ? 'lax' : 'none',
      secure: process.env.NODE_ENV === 'DEVELOPMENT' ? false : true,
    })
    .json({
      success: true,
    })
}

export const getMyDetail = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  })
}
