import { Customer } from "../customer/Customer";

export function isQuantityAvailableForCartItems(customer:Customer) : boolean {
    customer.getCart().getItems().forEach((currentCartItem) => {
        if(currentCartItem.getItemQuantity() > currentCartItem.getItem().getQuantity()) {
            console.log(`For the book ( ${currentCartItem.getItem().getTitle()} ) we have only ${currentCartItem.getItem().getQuantity()} Quantity ...`);
            return false;
        }
    })
    return true;
}