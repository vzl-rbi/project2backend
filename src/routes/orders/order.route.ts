import express from "express";
import { authMiddleware} from "../../middleware/auth.middleware.js";
import createOrder from "../../controllers/orders/order.controller.js";

const orderRouter = express.Router();

orderRouter.route("/orders")
.post(authMiddleware, createOrder);

export default orderRouter;
