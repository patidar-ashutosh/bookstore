import { Book } from "../books/Book";
import { CartItem } from "../cart/CartItem";
import { Customer } from "../customer/Customer";
import { paymentTypes } from "../enums/paymentTypes";
import { PaymentReceiptSchema } from "../payment/Payment";
import { Order } from "./Order";

console.log("hii")

export class DigitalOrder extends Order {

    constructor( products: CartItem[], totalPriceOfOrder:number,  paymentDetail:PaymentReceiptSchema,orderType : string) {
        super(products, totalPriceOfOrder, paymentDetail,orderType);
    }
    
}
