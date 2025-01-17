import { quantityValidation } from "../../validation/quantityValidation";
import { BookInventory } from "../books/BookInventory";
import { Customer } from "../customer/Customer";
import { Order } from "../order/Order";

export class Cart {
    public cartItems : Order[] = [];

    addToCart(indexOfBook:number, quantity:number, currentCustomer:Customer) {
        const bookData = BookInventory.books;
        const customerSelectBook = bookData[indexOfBook];
        
        let isQuantityAvailable = quantityValidation(customerSelectBook, quantity);

        if(!isQuantityAvailable) {
            return;
        }

        this.cartItems.push(new Order(customerSelectBook, currentCustomer, quantity, ""));
        console.log("~~~~~~~~~~ iteam added in cart successfully :) ~~~~~~~~~~");
        return;
    }

    removeItemFromCart(indexOfItem:number) {
        let isItemPresentInCart = false;

        this.cartItems.forEach((currentItem, index) => {
            if(index === indexOfItem) {
                isItemPresentInCart = true;
                this.cartItems.splice(index, 1);
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

        if(this.cartItems.length === 0) {
            console.log("------------ you have no item in cart yet :) ------------\n");
            return;
        }

        this.cartItems.forEach((currentOrder, index) => {
            console.log("~~~~~~~~~~ Cart Item " + (index+1) + " ~~~~~~~~~~");
            currentOrder.printOrderDetails();
        })
    }
}