import express from "express";
import { authMiddleware, restrictTo, Role} from "../../middleware/auth.middleware.js";
import { cancelMyOrder, changeOrderStatus, createOrder, deleteOrder, fetchAllOrders, fetchMyOrder, fetchOrderDetail, verifyPayment } from "../../controllers/orders/order.controller.js";

const orderRouter = express.Router();

orderRouter.route("/orders")
.post(authMiddleware, createOrder);

orderRouter.route("/verify")
.post(authMiddleware, verifyPayment)

orderRouter.route("/customer")
.get(authMiddleware, fetchMyOrder)

orderRouter.route("/customer/:id")
.get(authMiddleware, fetchOrderDetail)
.patch(authMiddleware, restrictTo(Role.Customer), cancelMyOrder)

orderRouter.route("/admin/:id")
.patch(authMiddleware, restrictTo(Role.Admin), changeOrderStatus)
.delete(authMiddleware, restrictTo(Role.Admin), deleteOrder)

// Optional: Admin fetch all orders (add a new controller if needed, e.g., fetchAllOrders)
orderRouter.route("/admin/orders")
.get(authMiddleware, restrictTo(Role.Admin),fetchAllOrders);

export default orderRouter;
