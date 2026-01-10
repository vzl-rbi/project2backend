import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Order from "../../database/models/order.model.js";
import { orderData, PaymentMethod } from "../../types/order.types.js";
import OrderDetail from "../../database/models/orderDetail.model.js";
import axios from "axios";
import Payment from "../../database/models/payement.model.js";

const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    console.log("BODY:", req.body);

    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized userId" });
      return;
    }

    const { phoneNumber, shippingAddress, totalAmount, paymentDetails, items }: orderData = req.body;

    if (
      !phoneNumber ||
      !shippingAddress ||
      !totalAmount ||
      !paymentDetails.paymentMethod ||
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
      paymentMethod: paymentDetails.paymentMethod,
      orderId: order.id, // Assuming association exists (e.g., belongsTo Order)
    });

    for (let i = 0; i < items.length; i++) {
      await OrderDetail.create({
        quantity: items[i]?.quantity,
        productId: items[i]?.productId,
        orderId: order.id
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
        "https://dev.khalti.com/api/v2/epayment/initiate",
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
};

export default createOrder;