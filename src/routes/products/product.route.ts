import express from "express"
import addProduct from "../../controllers/products/product.controller.js"
import { authMiddleware, restrictTo, Role } from "../../middleware/auth.middleware.js"
import { storage, multer } from "../../middleware/multer.middlware.js"
const upload = multer({storage:storage})
const productRouter = express.Router()
productRouter.route("/product").post(authMiddleware, restrictTo(Role.Admin),upload.single("image"), addProduct)



export default productRouter