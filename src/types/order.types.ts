export interface orderData {
phoneNumber: string;
shippingAddress: string;
totalAmount: number;
paymentDetails: {
  paymentMethod: PaymentMethod;
  paymentStatus?: PaymentStatus;
  pidx?: string
};
items: OrderDetils[]
}
export interface OrderDetils {
  quantity: number;
  productId: string
}
export enum PaymentMethod{
  Cod = "cod",
  Khalti = "khalti",
  Esewa = "esewa"
}
enum PaymentStatus {
  Paid = "paid",
  Unpaid = "unpaid"
}