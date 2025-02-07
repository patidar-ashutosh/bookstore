import { CartItem } from "../cart/CartItem";

export interface PaymentStructure {
  pay(): boolean;
}

export interface PaymentReceipt {
  paymentId: string;
  paymentMethod: BasePayment;
}

// export interface Order {
//   products: CartItem[];
//   totalPriceOfOrder: number;
//   paymentDetail: PaymentReceipt;
//   orderType: string;
//   shippingAddress?:string
// }
