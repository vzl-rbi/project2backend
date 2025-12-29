import express from "express"
import { loginuser, registerUser } from "../../../controllers/globals/auth/auth.controller.js"

const authRouter = express.Router()

authRouter.route("/register").post(registerUser)
authRouter.route("login").post(loginuser)

export default authRouter