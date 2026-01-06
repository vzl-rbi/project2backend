import express from "express"
import {addProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct } from "../../controllers/products/product.controller.js"
import { authMiddleware, restrictTo, Role } from "../../middleware/auth.middleware.js"
import { storage, multer } from "../../middleware/multer.middlware.js"
const upload = multer({storage:storage})
const productRouter = express.Router()

productRouter.route("/product")
.post(authMiddleware, restrictTo(Role.Admin),upload.single("image"), addProduct)
.get(getAllProduct)

productRouter.route("/product/:id")
.get(getSingleProduct)
.delete(authMiddleware, restrictTo(Role.Admin), deleteProduct)
.patch(authMiddleware, restrictTo(Role.Admin), updateProduct)


export default productRouter