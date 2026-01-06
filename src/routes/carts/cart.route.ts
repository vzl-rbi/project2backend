import express from "express"
import {addToCart, getMyCart} from "../../controllers/carts/cart.controller.js"
import { authMiddleware } from "../../middleware/auth.middleware.js"

const cartRouter = express.Router()

cartRouter.route("/")
.post(authMiddleware,addToCart)
.get(authMiddleware, getMyCart)
export default cartRouter