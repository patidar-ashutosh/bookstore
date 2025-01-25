import { layoutDesign } from "../../service/layoutDesign";
import { CartItem } from "../cart/CartItem";
import { Address } from "../customer/Address";
import { PaymentReceiptSchema } from "../payment/Payment";
import { Order } from "./Order";

export class PhysicalOrder extends Order {

    constructor(products: CartItem[], totalPriceOfOrder:number, paymentDetail:PaymentReceiptSchema, public shippingAddress:Address) {
        super(products, totalPriceOfOrder, paymentDetail);
    }

    printDetails() : void {
        super.printDetails();
        let {createLine, centerText} = layoutDesign.designTheOutput();
        const boxWidth : number = 60; // Width of the box
        console.log(centerText("Shipping Address", boxWidth));
        console.log(createLine(boxWidth, "-"));
        this.shippingAddress.printDetails();   
    }
    
}