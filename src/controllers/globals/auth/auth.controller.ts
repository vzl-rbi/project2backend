import { Request, Response } from "express"
import User from "../../../database/models/user.model.js"
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken"
import { envJwt } from "../../../config/config.js"

export const registerUser = async (req:Request, res:Response) => {
   const { username, email, password, role} = req.body
  if(!username || !email || !password) {
  return res.status(400).json({message: "Please Provide required Username, Email, and Password"})
    }
    const hashPassword = await bcrypt.hash(password, 10)
await User.create( {
  username: username,
  email: email,
  password: hashPassword,
  role: role
})
res.status(200).json({message: "Registerd Sucessfully!!"})
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