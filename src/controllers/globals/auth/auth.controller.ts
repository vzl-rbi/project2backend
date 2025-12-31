import { Request, Response } from "express"
import User from "../../../database/models/user.model.js"
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken"
import { envJwt } from "../../../config/config.js"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      res.status(400).json({ message: "Username, email, and password are required" })
      return
    }

    if (password.length < 6) {
      res.status(400).json({ message: "Password must be at least 6 characters long" })
      return
    }

    const existingUser = await User.findOne({
      where: { email }
    })

    if (existingUser) {
      res.status(409).json({ message: "Email already exists" })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      username,
      email,
      password: hashedPassword,
    })

    res.status(201).json({ message: "Registered successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const loginUser = async(req:Request, res: Response) => {
   const { email, password} = req.body
  if(!email || !password) {
    return res.status(400).json({message: "Please Provide Email and password!!"})
  }
  const user = await User.findOne({
    where: { email }
  })
  if(!user) {
    return res.status(400).json({message: "User not found, Please register first!!"})
  }
  const match = await bcrypt.compare(password, user.password)
  if(!match) {
    return res.status(400).json({message: "Please provide correct password"})
  }
  const token = jwt.sign({id: user.id}, envJwt.secret, {
    expiresIn: envJwt.expiresIn
  })
  res.cookie(envJwt.cookieName, token)
  return res.status(200).json({message: "Logged In Successful!!", Token: token}) 
 
  
}