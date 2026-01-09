import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Order from "../../database/models/order.model.js";
import { orderData, PaymentMethod } from "../../types/order.types.js";
import Payment from "../../database/models/payement.model.js";
import OrderDetail from "../../database/models/orderDetail.model.js";

export const createOrder = async(req:AuthRequest, res:Response):Promise<void> => {
  const userId = req.user?.id
  const {phoneNumber, shippingAddress, totalAmount, paymentDetails, items}:orderData = req.body
  if(!userId) {
    res.status(400).json({
      message: "Unauthorized userId"
    })
    return
  }
  if(!phoneNumber || !shippingAddress || ! totalAmount || !paymentDetails.paymentMethod || items.length === 0) {
    res.status(400).json({
      message: "Please provide phoneNumber, shippingAddress, totalAmount, orderStatus "
    })
    return
  }
  const order = await Order.create({
    phoneNumber,
    shippingAddress,
    totalAmount,
    userId
  })
  await Payment.create({
    paymentDetails: paymentDetails.paymentMethod
  })
  for(let i=0; i<items.length; i++) {
    await OrderDetail.create({
      quantity: items[1]?.quantity,
      productId: items[0]?.productId,
      orderId: order.id
    })

  }
  if(paymentDetails.paymentMethod === PaymentMethod.Khalti) {
    //khalti integration code
  } else {
    res.status(200).json({
    message: "Order placed successfully!!"
  })

  }
  
}