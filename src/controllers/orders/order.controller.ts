import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Order from "../../database/models/order.model.js";
import { orderData, PaymentMethod } from "../../types/order.types.js";
import OrderDetail from "../../database/models/orderDetail.model.js";
import axios from "axios";
import Payment from "../../database/models/payment.model.js";
// import sequelize from "../../database/connection.js";

const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
   console.log("BODY:", req.body);
  // const t = await sequelize.transaction();

  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { phoneNumber, shippingAddress, totalAmount, paymentDetails, items }: orderData = req.body;

    if (!phoneNumber || !shippingAddress || !totalAmount || !paymentDetails?.paymentMethod || !items?.length) {
      res.status(400).json({ message: "Invalid order data" });
      return;
    }

    const order = await Order.create(
      { phoneNumber, shippingAddress, totalAmount, userId },
      // { transaction: t }
    );

    const payment = await Payment.create(
      { paymentMethod: paymentDetails.paymentMethod, orderId: order.id },
      // { transaction: t }
    );

    for (const item of items) {
      await OrderDetail.create(
        {
          quantity: item.quantity,
          productId: item.productId,
          orderId: order.id,
        },
        // { transaction: t }
      );
    }

    if (paymentDetails.paymentMethod === PaymentMethod.Khalti) {
      const khaltiResponse = await axios.post(
        "https://dev.khalti.com/api/v2/epayment/initiate",
        {
          return_url: "http://localhost:4000/api/payment/khalti/success",
          website_url: "http://localhost:4000",
          purchase_order_id: order.id,
          purchase_order_name: `order-${order.id}`,
          amount: totalAmount * 100,
        },
        {
          headers: {
            Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      await payment.update(
        { pidx: khaltiResponse.data.pidx },
        // { transaction: t }
      );

      // await t.commit();

      res.status(200).json({
        paymentUrl: khaltiResponse.data.payment_url,
      });
      return;
    }

    // await t.commit();
    res.status(201).json({ message: "Order placed successfully" });

  } catch (err: any) {
    // await t.rollback();

    console.error("ORDER ERROR:", err.response?.data || err.message);

    res.status(500).json({
      message: "Order creation failed",
      error: err.response?.data || err.message,
    });
  }
};

export default createOrder;



