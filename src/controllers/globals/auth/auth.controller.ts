import { Request, Response } from "express"
import User from "../../../database/models/user.model.js"
export const registerUser = async (req:Request, res:Response) => {
  const { username, email, password} = req.body
  if(!username || !email || !password) {
  return res.status(400).json({message: "Please Provide required Username, Email, and Password"})
    }
await User.create( {
  username: username,
  email: email,
  password: password
})
res.status(200).json({message: "Registerd Sucessfully!!"})
}