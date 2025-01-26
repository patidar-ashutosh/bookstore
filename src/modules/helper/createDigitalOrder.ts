import { CartItem } from "../cart/CartItem";
import { Customer } from "../customer/Customer";
import { DigitalOrder } from "../order/DigitalOrder";
import { PaymentReceiptSchema } from "../payment/Payment";

export function createDigitalOrder(customer:Customer,paymentDetail:PaymentReceiptSchema):DigitalOrder{

    let totalPriceOfOrder : number = 0;
    let products : CartItem[] = [];

    customer.getCart().getItems().forEach((currentItem:CartItem)=>{
        totalPriceOfOrder += currentItem.getTotalPrice();
        products.push(currentItem);
    })

    return new DigitalOrder(products,totalPriceOfOrder,paymentDetail)
}