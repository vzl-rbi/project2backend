import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Order from "../../database/models/order.model.js";
import { KhaltiResponse, orderData, PaymentMethod } from "../../types/order.types.js";
import OrderDetail from "../../database/models/orderDetail.model.js";
import axios from "axios";
import Payment from "../../database/models/payment.model.js";
const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
   console.log("BODY:", req.body);
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
      { 
        phoneNumber,
        shippingAddress,
        totalAmount,
        userId
       },
    );

    const payment = await Payment.create(
      { 
        paymentMethod: paymentDetails.paymentMethod,
        orderId: order.id
       },
    );
    await order.update({
  paymentId: payment.id,
});
    for (const item of items) {
      await OrderDetail.create(
        {
          quantity: item.quantity,
          productId: item.productId,
          orderId: order.id,
        },
      );
    }
    //alternative 
    /*
    for (let i = 0; i < items.length; i++) {
      await OrderDetail.create({
        quantity: items[i]?.quantity,
        productId: items[i]?.productId,
        orderId: order.id
      });
    }
      */

    if (paymentDetails.paymentMethod === PaymentMethod.Khalti) {
  const response = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    {
      return_url: "http://localhost:5173/khalti/success",
      website_url: "http://localhost:5173",
      purchase_order_id: order.id,
      purchase_order_name: `order-${order.id}`,
      amount: totalAmount * 100,
    },
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const khaltiRes: KhaltiResponse = response.data;

  await payment.update({ pidx: khaltiRes.pidx });

  res.status(200).json({
    message: "Order placed successfully",
    paymentUrl: khaltiRes.payment_url,
  });
}
  } catch (err: any) {
    res.status(500).json({
      message: "Order creation failed",
      error: err.response?.data || err.message,
    });
  }
};

export default createOrder;



