import express from 'express'
import { authMiddleware, restrictTo, Role } from '../../middleware/auth.middleware.js'
import seedCategory from '../../controllers/categories/category.controller.js'

const categoryRouter = express.Router()
categoryRouter.route("/").post(authMiddleware, restrictTo(Role.Admin), seedCategory)
export default categoryRouter