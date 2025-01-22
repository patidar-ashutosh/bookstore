import { designTheOutput } from "../../utilities/designTheOutput";
import { validateQuantity } from "../../validation/validateQuantity";
import { Book } from "../books/Book";
import { BookInventory } from "../books/BookInventory";
import { CartItem } from "./CartItem";

export class Cart {
    public items : CartItem[] = [];

    addItem(indexOfBook:number, quantity:number) : boolean {
        const books : Book[] = BookInventory.books;
        const customerSelectedBook : Book = books[indexOfBook];
        
        let isQuantityAvailable : boolean = validateQuantity(customerSelectedBook, quantity);

        if(!isQuantityAvailable) {
            return false;
        }

        this.items.push(new CartItem(customerSelectedBook, quantity));
        console.log("~~~~~~~~~~ iteam added in cart successfully :) ~~~~~~~~~~");
        return true;
    }

    removeItem(cartItem:CartItem) : void {
        let isItemPresent : boolean = false;

        this.items.forEach((currentItem, index) => {
            if(currentItem.book.getBookId() === cartItem.book.getBookId()) {
                isItemPresent = true;
                this.items.splice(index, 1);
                console.log("--------- Iteam remove successfully from cart :) ---------");
                return;
            }
        })

        if(!isItemPresent) {
            console.log("------------- Iteam not present in cart!!! -------------");
        }
    }

    showItems() : void {
        if(this.items.length === 0) {
            console.log("------------ you have no item in cart yet :) ------------\n");
            return;
        }

        let {createLine, centerText} = designTheOutput();
        const boxWidth : number = 60; // Width of the box

        console.log(createLine(boxWidth, "="));
        console.log(centerText("Cart Items", boxWidth));

        this.items.forEach((currentItem, index) => {
            console.log(centerText(`Item #${index + 1}`, boxWidth));
            this.printItemDetails(currentItem);
        })

        console.log(createLine(boxWidth, "="));
    }

    printItemDetails(currentItem : CartItem) : void {
        let {createLine} = designTheOutput();
        const boxWidth : number = 60; // Width of the box

        console.log(createLine(boxWidth, "-"));
        console.log(`| Title       : ${currentItem.book.getTitle().padEnd(boxWidth - 17)}|`);
        console.log(`| Author      : ${currentItem.book.getAuthor().padEnd(boxWidth - 17)}|`);
        console.log(`| Price       : ${currentItem.book.getPrice().toString().padEnd(boxWidth - 17)}|`);
        console.log(`| Category    : ${currentItem.book.getCategory().padEnd(boxWidth - 17)}|`);
        console.log(`| Publisher   : ${currentItem.book.getPublisher().padEnd(boxWidth - 17)}|`);
        console.log(`| Quantity    : ${currentItem.bookQuantity.toString().padEnd(boxWidth - 17)}|`);
        console.log(`| Total price : ${currentItem.totalPrice.toString().padEnd(boxWidth - 17)}|`);
        console.log(createLine(boxWidth, "-"));
    }
}