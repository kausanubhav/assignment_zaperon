import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { User } from "../models/userModel.js"

import { JWT_SECRET, JWT_EXPIRES_NUM } from "../config.js"

//@desc Register a new user
//@route /api/users
//@access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body

  //Validation
  //Send client error ex. 400 if any input field is not filled
  if (!name || !password) {
    res.status(400)
    throw Error("Please include all fields ")
  }

  const userExists = await User.findOne({ name })
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create user
  const user = await User.create({
    name,
    password: hashedPassword,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

//@desc login a user
//@route /api/users/login
//@access Public

export const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body
  const user = await User.findOne({ name })
  //Check if email and password match
  const cookieOptions = {
    expires: new Date(Date.now() + JWT_EXPIRES_NUM),
    secure: true,
    httpOnly: true,
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id)
    res.cookie("token", token, cookieOptions)
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid Credentials")
  }
})
//check logged in

export const checkLoggedIn = async (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json(false)
    }
    jwt.verify(token, JWT_SECRET)
    res.send(true)
  } catch (error) {
    res.send(false)
  }
}

//logout user
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  })
})

//Generate token function
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_NUM })
}
