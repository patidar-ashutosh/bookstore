import { Book } from "../books/Book";
import { CartItem } from "../cart/CartItem";
import { Customer } from "../customer/Customer";
import { paymentTypes } from "../enums/paymentTypes";
import { PaymentReceiptSchema } from "../payment/Payment";
import { Order } from "./Order";

export class DigitalOrder extends Order {

    constructor(products: CartItem[], totalPriceOfOrder:number, paymentDetail:PaymentReceiptSchema) {
        super(products, totalPriceOfOrder, paymentDetail);
    }


    // public static createOrder(customer:Customer,paymentDetail:PaymentReceiptSchema):DigitalOrder{

    //     let totalPriceOfOrder : number = 0;
    //     let products : CartItem[] = [];
    
    //     customer.getCart().getItems().forEach((currentItem:CartItem)=>{
    //         totalPriceOfOrder += currentItem.getTotalPrice();
    //         products.push(currentItem);
    //     })
    
    //     return new DigitalOrder(products,totalPriceOfOrder,paymentDetail)
    // }
}