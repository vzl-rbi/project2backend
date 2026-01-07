import express from "express"
import {addToCart, getMyCart, updateCartItems} from "../../controllers/carts/cart.controller.js"
import { authMiddleware } from "../../middleware/auth.middleware.js"

const cartRouter = express.Router()

cartRouter.route("/cart/")
.post(authMiddleware,addToCart)
.get(authMiddleware, getMyCart)

cartRouter.route("/cart/:productId")
.patch(authMiddleware, updateCartItems)
export default cartRouter