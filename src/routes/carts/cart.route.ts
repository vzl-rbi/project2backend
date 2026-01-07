import express from "express"
import {addToCart, deleteMyCartItem, getMyCart, updateCartItems} from "../../controllers/carts/cart.controller.js"
import { authMiddleware } from "../../middleware/auth.middleware.js"

const cartRouter = express.Router()

cartRouter.route("/cart/")
.post(authMiddleware,addToCart)
.get(authMiddleware, getMyCart)

cartRouter.route("/cart/:productId")
.patch(authMiddleware, updateCartItems)
.delete(authMiddleware, deleteMyCartItem)
export default cartRouter