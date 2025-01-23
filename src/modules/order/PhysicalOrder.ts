import { CartItem } from "../cart/CartItem";
import { Address } from "../customer/Address";
import { Order } from "./Order";

export class PhysicalOrder extends Order {

    constructor(products: CartItem[], totalPriceOfOrder:number, public paymentType:string, public shippingAddress?:Address) {
        super(products, totalPriceOfOrder);
    }

    
}