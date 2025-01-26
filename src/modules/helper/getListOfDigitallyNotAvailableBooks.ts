import { Cart } from "../cart/Cart";
import { CartItem } from "../cart/CartItem";

export function getListOfDigitallyNotAvailableBooks(cart:Cart):CartItem[] | true {

    let digitallyNotAvailableItems:CartItem[] = [];

    cart.getItems().forEach((currentItem:CartItem)=>{
        if(!currentItem.getItem().isDigitallyAvailable()){
            digitallyNotAvailableItems.push(currentItem)
        }
    })
    
    if(digitallyNotAvailableItems.length>0){
        return digitallyNotAvailableItems;
    }
    return true;
}