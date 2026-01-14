import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Order from "../../database/models/order.model.js";
import { KhaltiResponse, orderData, OrderStatus, PaymentMethod, TransactionStatus, TransactionVerifyResponse } from "../../types/order.types.js";
import OrderDetail from "../../database/models/orderDetail.model.js";
import axios from "axios";
import Payment from "../../database/models/payment.model.js";
import { error } from "node:console";
import Product from "../../database/models/product.model.js";
export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
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
export const verifyPayment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { pidx } = req.body;
    if (!pidx) {
      res.status(400).json({ message: "Please provide pidx" });
      return;
    }

    // 1️⃣ Find payment record
    const payment = await Payment.findOne({
      where: { pidx },
      include: [{ model: Order }]
    });

    if (!payment) {
      res.status(404).json({ message: "Invalid payment reference" });
      return;
    }

    // 2️⃣ Prevent double verification
    if (payment.paymentStatus === TransactionStatus.Completed) {
      res.status(200).json({
        message: "Payment already verified",
        data: payment
      });
      return;
    }

    // 3️⃣ Verify with Khalti
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
console.log(response)
    const khaltiData: TransactionVerifyResponse = response.data;

    // 4️⃣ Check status
    if (khaltiData.status !== TransactionStatus.Completed) {
      res.status(400).json({
        message: "Payment not completed",
        status: khaltiData.status,
      });
      return;
    }
    // 6️⃣ Mark payment & order as PAID
    await payment.update({
      paymentStatus: "paid",
    });
    res.status(200).json({
      message: "Payment verified successfully",
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      message: "Payment verification failed",
      error: error,
    });
  }
};
export const fetchMyOrder = async(req:AuthRequest, res:Response):Promise<void> => {
try {
  const userId = req.user?.id
if(!userId){
  res.status(401).json({
    message: "Unauthorized userId"
  })
  return
}
const orders = await Order.findAll({
  where: {
    userId
  },
  include: [
    {

      model: Payment
    }
  ]
})
if(orders.length === 0) {
  res.status(404).json({
    message: "Order fetched failed!!",
    data: []
  }) 
  return
}
res.status(200).json({
  message: "order fetched Successfully!!",
  data: orders
})
} catch (err) {
  console.error("Fetch order error:", error);
  res.status(500).json({
    message: "Internal Server Error",
    error: err
  })
  
}
}
//Customer side starts from here
export const fetchOrderDetail = async(req:AuthRequest, res:Response):Promise<void> => {
const userId = req.user?.id
if(!userId){
  res.status(401).json({
    message: "Unauthorized userId"
  })
  return
}
const orderId = req.params.id
const orderDetails = await OrderDetail.findAll({
  where: {
    orderId
  },
  include: [
    {
      model: Product
    }
  ]
})
if(orderDetails.length === 0) {
  res.status(404).json({
    message: "Order Details fetched Failed!!"
  })
  return
}
res.status(200).json({
  message: "Order Details fetched Successfuly!!",
  data: orderDetails
})
}
export const cancelMyOrder = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const orderId = req.params.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const order = await Order.findOne({
      where: {
        id: orderId,
        userId,
      },
    });

    if (!order) {
      res.status(404).json({
        message: "Order not found",
      });
      return;
    }

    if (
      order.orderStatus === OrderStatus.Ontheway ||
      order.orderStatus === OrderStatus.Preparation
    ) {
      res.status(400).json({
        message: "Order cannot be cancelled at this stage",
      });
      return;
    }

    await order.update({
      orderStatus: OrderStatus.Cancelled,
    });

    res.status(200).json({
      message: "Order cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
//Customer Side End
