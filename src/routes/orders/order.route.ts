import express from "express";
import { authMiddleware} from "../../middleware/auth.middleware.js";
import { createOrder, verifyPayment } from "../../controllers/orders/order.controller.js";

const orderRouter = express.Router();

orderRouter.route("/orders")
.post(authMiddleware, createOrder);

orderRouter.route("/verify")
.post(authMiddleware, verifyPayment)

export default orderRouter;
