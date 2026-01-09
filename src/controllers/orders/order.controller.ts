import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Order from "../../database/models/order.model.js";
import { orderData, PaymentMethod } from "../../types/order.types.js";
import Payment from "../../database/models/payement.model.js";
import OrderDetail from "../../database/models/orderDetail.model.js";
import axios from "axios";

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized userId" });
      return;
    }

    const { phoneNumber, shippingAddress, totalAmount, paymentDetails, items } = req.body as orderData;

    if (
      !phoneNumber ||
      !shippingAddress ||
      typeof totalAmount !== "number" ||
      !paymentDetails?.paymentMethod ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      res.status(400).json({
        message: "Invalid order data",
      });
      return;
    }

    const order = await Order.create({
      phoneNumber,
      shippingAddress,
      totalAmount,
      userId,
    });

    await Payment.create({
      paymentDetails: paymentDetails.paymentMethod,
      orderId: order.id, // minimal but important
    });

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item) continue;
      await OrderDetail.create({
        quantity: item.quantity,
        productId: item.productId,
        orderId: order.id,
      });
    }

    if (paymentDetails.paymentMethod === PaymentMethod.Khalti) {
      const data = {
        return_url: "http://localhost:4000/success",
        website_url: "http://localhost:4000",
        purchase_order_id: order.id,
        purchase_order_name: "orderName-" + order.id,
        amount: totalAmount * 100,
      };

      const khaltiResponse = await axios.post(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        data,
        {
          headers: {
            Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      res.status(200).json({
        paymentUrl: khaltiResponse.data.payment_url,
      });
      return;
    }

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
