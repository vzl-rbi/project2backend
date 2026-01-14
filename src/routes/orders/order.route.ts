import express from "express";
import { authMiddleware, restrictTo, Role} from "../../middleware/auth.middleware.js";
import { cancelMyOrder, createOrder, fetchMyOrder, fetchOrderDetail, verifyPayment } from "../../controllers/orders/order.controller.js";

const orderRouter = express.Router();

orderRouter.route("/orders")
.post(authMiddleware, createOrder);

orderRouter.route("/verify")
.post(authMiddleware, verifyPayment)

orderRouter.route("/customer")
.post(authMiddleware, fetchMyOrder)

orderRouter.route("/customer/:id")
.get(authMiddleware, fetchOrderDetail)
.patch(authMiddleware, restrictTo(Role.Customer), cancelMyOrder)

export default orderRouter;
