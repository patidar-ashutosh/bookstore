import { Book } from "../books/Book";
import { CartItem } from "../cart/CartItem";
import { PaymentReceipt } from "../payment/PaymentStructure";
import { Order } from "./Order";

console.log("hii")

export class DigitalOrder extends Order {

    constructor( products: CartItem[], totalPriceOfOrder:number,  paymentDetail:PaymentReceipt,orderType : string) {
        super(products, totalPriceOfOrder, paymentDetail,orderType);
    }
    
}
