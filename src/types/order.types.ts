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

export interface KhaltiResponse {
  pidx: string;
  payment_url: string;
  expires_at: Date | string;
  expires_in: number;
  suer_fee: number
}
export interface TransactionVerifyResponse {
  pidx: string;
  total_amount: number;
   status: TransactionStatus;
   transaction_id: string;
   fee: number;
   refunded: boolean
}
export enum TransactionStatus {
  Completed = "Completed",
  Pending = "Pending",
  Initiated = "Initiated",
  Refunded = "Refunded"
}