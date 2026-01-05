import express from "express"
import addToCart from "../../controllers/carts/cart.controller.js"
import { authMiddleware } from "../../middleware/auth.middleware.js"

const carRouter = express.Router()

carRouter.route("/").post(authMiddleware,addToCart)
export default carRouter