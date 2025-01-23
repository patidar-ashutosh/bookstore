import { layoutDesign } from "../../service/layoutDesign";
import { CartItem } from "../cart/CartItem";
import { Address } from "../customer/Address";
import { Order } from "./Order";

export class PhysicalOrder extends Order {

    constructor(products: CartItem[], totalPriceOfOrder:number, paymentType:string, public shippingAddress:Address, paymentMethod:string) {
        super(products, totalPriceOfOrder, "physical", paymentType, paymentMethod);
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