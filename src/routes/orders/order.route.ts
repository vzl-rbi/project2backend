import express from "express";
import { authMiddleware} from "../../middleware/auth.middleware.js";
import createOrder from "../../controllers/orders/order.controller.js";
import errorHandler from "../../services/catchAsyncError.js";

const orderRouter = express.Router();

orderRouter.route("/orders")
.post(authMiddleware, errorHandler(createOrder));

export default orderRouter;
