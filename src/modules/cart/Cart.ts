import { quantityValidation } from "../../validation/quantityValidation";
import { BookInventory } from "../books/BookInventory";
import { Customer } from "../customer/Customer";
import { Order } from "../order/Order";
import { CartItems } from "./CartItems";

export class Cart {
    public allcartItems : CartItems[] = [];

    addToCart(indexOfBook:number, quantity:number, currentCustomer:Customer) {
        const bookData = BookInventory.books;
        const customerSelectBook = bookData[indexOfBook];
        
        let isQuantityAvailable = quantityValidation(customerSelectBook, quantity);

        if(!isQuantityAvailable) {
            return;
        }

        this.allcartItems.push(new CartItems(customerSelectBook, currentCustomer, quantity, ""));
        console.log("~~~~~~~~~~ iteam added in cart successfully :) ~~~~~~~~~~");
        return;
    }

    removeItemFromCart(indexOfItem:number) {
        let isItemPresentInCart = false;

        this.allcartItems.forEach((currentItem, index) => {
            if(index === indexOfItem) {
                isItemPresentInCart = true;
                this.allcartItems.splice(index, 1);
                console.log("-------------- Item remove successfully from cart :) --------------\n");
                return;
            }
        })

        if(!isItemPresentInCart) {
            console.log("-------------- item not present in cart!!! --------------\n");
        }
    }

    getAllCartItems() {
        console.log("----------------- all cart items -----------------\n");

        if(this.allcartItems.length === 0) {
            console.log("------------ you have no item in cart yet :) ------------\n");
            return;
        }

        this.allcartItems.forEach((currentCart, index) => {
            console.log("~~~~~~~~~~ Cart Item " + (index+1) + " ~~~~~~~~~~");
            this.printCartDetails(currentCart);
        })
    }

    printCartDetails(currentCart:CartItems) {
        console.log("| title of book -> " + currentCart.book.title);
        console.log("| author of book -> " + currentCart.book.author);
        console.log("| price of book -> " + currentCart.book.price);
        console.log("| category of book -> " + currentCart.book.category);
        console.log("| publisher of book -> " + currentCart.book.publisher);
        console.log("| quantity of book -> " + currentCart.bookQuantity);
        console.log("| total price of book -> " + currentCart.totalPrice);
        console.log("| order type of book -> " + currentCart.orderType);

        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
    }
}