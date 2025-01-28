import { Cart } from "../cart/Cart";
import { CartItem } from "../cart/CartItem";
import { Address } from "../customer/Address";
import { Customer } from "../customer/Customer";
import { PaymentReceiptSchema } from "../payment/Payment";
import { DigitalOrder } from "./DigitalOrder";
import { PhysicalOrder } from "./PhysicalOrder";

export function  createOrder(customer:Customer,paymentDetail:PaymentReceiptSchema,orderType : string,shippingAddress?:Address):DigitalOrder | PhysicalOrder{

    let totalPriceOfOrder : number = 0;
    let products : CartItem[] = [];

    customer.getCart().getItems().forEach((currentItem:CartItem)=>{
        totalPriceOfOrder += currentItem.getTotalPrice();
        products.push(currentItem);
    })

    if(shippingAddress){
        quantityDecreaser(customer.getCart());
        return new PhysicalOrder(products,totalPriceOfOrder,paymentDetail,orderType,shippingAddress)
    }

    return new DigitalOrder(products,totalPriceOfOrder,paymentDetail,orderType)
}

export function quantityDecreaser(cart:Cart){
    cart.getItems().forEach((currentCartItem:CartItem)=>{
        currentCartItem.getItem().setQuantity(currentCartItem.getItem().getQuantity()-currentCartItem.getItemQuantity());
    })
}