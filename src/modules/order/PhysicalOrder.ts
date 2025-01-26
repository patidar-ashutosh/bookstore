import { layoutDesign } from "../../service/layoutDesign";
import { CartItem } from "../cart/CartItem";
import { Address } from "../customer/Address";
import { Customer } from "../customer/Customer";
import { PaymentReceiptSchema } from "../payment/Payment";
import { Order } from "./Order";

export class PhysicalOrder extends Order {

    constructor(products: CartItem[], totalPriceOfOrder:number, paymentDetail:PaymentReceiptSchema, public shippingAddress:Address) {
        super(products, totalPriceOfOrder, paymentDetail);
    }

    // public static createOrder(customer:Customer,paymentDetail:PaymentReceiptSchema, shippingAddress:Address):PhysicalOrder{

    //     let totalPriceOfOrder : number = 0;
    //     let products : CartItem[] = [];
    
    //     customer.getCart().getItems().forEach((currentItem) => {
    //         totalPriceOfOrder += currentItem.getTotalPrice();
    //         products.push(currentItem);
    
    //         currentItem.getItem().setQuantity(currentItem.getItem().getQuantity() - currentItem.getItemQuantity());
    //     })
    
    //     return new PhysicalOrder(products, totalPriceOfOrder,paymentDetail, shippingAddress);
    
    // }

    printDetails() : void {
        super.printDetails();
        let {createLine, centerText} = layoutDesign.designTheOutput();
        const boxWidth : number = 60; // Width of the box
        console.log(centerText("Shipping Address", boxWidth));
        console.log(createLine(boxWidth, "-"));
        this.shippingAddress.printDetails();   
    }
    
}

















