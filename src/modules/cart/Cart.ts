import { quantityValidation } from "../../validation/quantityValidation";
import { Book } from "../books/Book";
import { BookInventory } from "../books/BookInventory";
import { CartItems } from "./CartItems";

export class Cart {
    public allCartItems : CartItems[] = [];

    addToCart(indexOfBook:number, quantity:number) : boolean {
        const bookData : Book[] = BookInventory.books;
        const customerSelectBook : Book = bookData[indexOfBook];
        
        let isQuantityAvailable : boolean = quantityValidation(customerSelectBook, quantity);

        if(!isQuantityAvailable) {
            return false;
        }

        this.allCartItems.push(new CartItems(customerSelectBook, quantity));
        console.log("~~~~~~~~~~ iteam added in cart successfully :) ~~~~~~~~~~\n");
        return true;
    }

    removeItemFromCart(cartItem:CartItems) : void {
        let isItemPresentInCart : boolean = false;

        this.allCartItems.forEach((currentItem, index) => {
            if(currentItem.book.getBookId() === cartItem.book.getBookId()) {
                isItemPresentInCart = true;
                this.allCartItems.splice(index, 1);
                console.log("-------------- Item remove successfully from cart :) --------------\n");
                return;
            }
        })

        if(!isItemPresentInCart) {
            console.log("-------------- item not present in cart!!! --------------\n");
        }
    }

    showAllCartItems() : void {
        if(this.allCartItems.length === 0) {
            console.log("------------ you have no item in cart yet :) ------------\n");
            return;
        }

        console.log("----------------- all cart items -----------------\n");
        
        this.allCartItems.forEach((currentCart, index) => {
            console.log("~~~~~~~~~~ Cart Item " + (index+1) + " ~~~~~~~~~~");
            this.printCartDetails(currentCart);
        })
    }

    printCartDetails(currentCart:CartItems) : void {
        console.log("| title of book -> " + currentCart.book.getTitle());
        console.log("| author of book -> " + currentCart.book.getAuthor());
        console.log("| price of book -> " + currentCart.book.getPrice());
        console.log("| category of book -> " + currentCart.book.getCategory());
        console.log("| publisher of book -> " + currentCart.book.getPublisher());
        console.log("| quantity of book -> " + currentCart.bookQuantity);
        console.log("| total price of this cart -> " + currentCart.totalPrice);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
    }
}