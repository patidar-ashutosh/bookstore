import { quantityValidation } from "../../validation/quantityValidation";
import { Book } from "../books/Book";
import { BookInventory } from "../books/BookInventory";
import { CartItem } from "./CartItem";

export class Cart {
    public items : CartItem[] = [];

    addItem(indexOfBook:number, quantity:number) : boolean {
        const books : Book[] = BookInventory.books;
        const customerSelectedBook : Book = books[indexOfBook];
        
        let isQuantityAvailable : boolean = quantityValidation(customerSelectedBook, quantity);

        if(!isQuantityAvailable) {
            return false;
        }

        this.items.push(new CartItem(customerSelectedBook, quantity));
        console.log("~~~~~~~~~~ iteam added in cart successfully :) ~~~~~~~~~~\n");
        return true;
    }

    removeItem(cartItem:CartItem) : void {
        let isItemPresent : boolean = false;

        this.items.forEach((currentItem, index) => {
            if(currentItem.book.getBookId() === cartItem.book.getBookId()) {
                isItemPresent = true;
                this.items.splice(index, 1);
                console.log("-------------- Item remove successfully from cart :) --------------\n");
                return;
            }
        })

        if(!isItemPresent) {
            console.log("-------------- item not present in cart!!! --------------\n");
        }
    }

    showItems() : void {
        if(this.items.length === 0) {
            console.log("------------ you have no item in cart yet :) ------------\n");
            return;
        }

        console.log("----------------- all cart items -----------------\n");
        
        this.items.forEach((currentItem, index) => {
            console.log("~~~~~~~~~~ Cart Item " + (index+1) + " ~~~~~~~~~~");
            this.printItemDetails(currentItem);
        })
    }

    printItemDetails(currentItem : CartItem) : void {
        console.log("| title of book -> " + currentItem.book.getTitle());
        console.log("| author of book -> " + currentItem.book.getAuthor());
        console.log("| price of book -> " + currentItem.book.getPrice());
        console.log("| category of book -> " + currentItem.book.getCategory());
        console.log("| publisher of book -> " + currentItem.book.getPublisher());
        console.log("| quantity of book -> " + currentItem.bookQuantity);
        console.log("| total price of this cart -> " + currentItem.totalPrice);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
    }
}