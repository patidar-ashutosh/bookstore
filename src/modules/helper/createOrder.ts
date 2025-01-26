import { CartItem } from "../cart/CartItem";
import { Address } from "../customer/Address";
import { Customer } from "../customer/Customer";
import { PhysicalOrder } from "../order/PhysicalOrder";
import { PaymentReceiptSchema } from "../payment/Payment";

export function createPhysicalOrder(customer:Customer,paymentDetail:PaymentReceiptSchema, shippingAddress:Address):PhysicalOrder{

    let totalPriceOfOrder : number = 0;
    let products : CartItem[] = [];

    customer.getCart().getItems().forEach((currentItem) => {
        totalPriceOfOrder += currentItem.getTotalPrice();
        products.push(currentItem);

        currentItem.getItem().setQuantity(currentItem.getItem().getQuantity() - currentItem.getItemQuantity());
    })

    return new PhysicalOrder(products, totalPriceOfOrder,paymentDetail, shippingAddress);
}