import express from "express"
import { loginUser, registerUser } from "../../../controllers/globals/auth/auth.controller.js"
import errorHandler from "../../../services/catchAsyncError.js"

const authRouter = express.Router()

authRouter.route("/register").post(errorHandler(registerUser))
authRouter.route("/login").post(errorHandler(loginUser))

export default authRouter