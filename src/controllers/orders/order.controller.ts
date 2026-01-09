import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Order from "../../database/models/order.model.js";
import { orderData, PaymentMethod } from "../../types/order.types.js";
import Payment from "../../database/models/payement.model.js";
import OrderDetail from "../../database/models/orderDetail.model.js";
import axios from "axios";

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
      quantity: items[i]?.quantity,
      productId: items[i]?.productId,
      orderId: order.id
    })

  }
  if(paymentDetails.paymentMethod === PaymentMethod.Khalti) {
    //khalti integration code
    const data = {
    return_url : "http://localhost:4000/success", //Landing page after the transaction.
    purchase_order_id: order.id,
    amount: totalAmount * 100,
    website_url: "http://localhost:400",
    purchase_order_name : 'orderName' + order.id,
    }
    const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", data, {
      headers :{
        "Authorization": "key live_secret_key_68791341fdd94846a146f0457ff7b455",
        'Content-Type': 'application/json',
      }
    })
    console.log(response)
  } else {
    res.status(200).json({
    message: "Order placed successfully!!"
  })

  }
  
}