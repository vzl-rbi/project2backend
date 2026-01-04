import express from 'express'
import { authMiddleware, restrictTo, Role } from '../../middleware/auth.middleware.js'
import { addCategory, deleteCategory, getCategory, seedCategory, updateCategory } from '../../controllers/categories/category.controller.js'

const categoryRouter = express.Router()
categoryRouter.route("/seed").post(authMiddleware, restrictTo(Role.Admin), seedCategory)

categoryRouter.route("/").get(getCategory).post(authMiddleware, restrictTo(Role.Admin), addCategory)

categoryRouter.route("/:id").patch(authMiddleware, restrictTo(Role.Admin), updateCategory).delete(authMiddleware, restrictTo(Role.Admin), deleteCategory)
export default categoryRouter