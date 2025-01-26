import { layoutDesign } from "../../service/layoutDesign";
import { validateQuantity } from "../../validation/validateQuantity";
import { Book } from "../books/Book";
import { BookInventory } from "../books/BookInventory";
import { findItemFromInventory } from "../helper/findItemFromInventory";
import { CartItem } from "./CartItem";

export class Cart {
    private items : CartItem[] = [];

    public getItems():CartItem[]{
        return this.items
    }

    public isItemsAvailable():boolean{
        if(this.getItems().length>0){
            return true
        }
        return false
    }

    public empty():void{
        this.items = [];
    }

    public addItem(indexOfBook:number, quantity:number) : boolean {
        const customerSelectedBook : Book = findItemFromInventory(indexOfBook)
        
        let isQuantityAvailable : boolean = validateQuantity(customerSelectedBook, quantity);

        if(!isQuantityAvailable) {
            return false;
        }

        this.items.push(new CartItem(customerSelectedBook, quantity));
        console.log("~~~~~~~~~~ item added in cart successfully :) ~~~~~~~~~~");
        return true;
    }

    public removeItem(cartItem:CartItem) : void {
        let isItemPresent : boolean = false;

        this.items.forEach((currentItem, index) => {
            if(currentItem.getItem().getBookId() === cartItem.getItem().getBookId()) {
                isItemPresent = true;
                this.items.splice(index, 1);
                console.log("--------- Item remove successfully from cart :) ---------");
                return;
            }
        })

        if(!isItemPresent) {
            console.log("------------- Item not present in cart!!! -------------");
        }
    }

    public showItems() : void {
        if(this.items.length === 0) {
            console.log("------------ you have no item in cart yet :) ------------\n");
            return;
        }

        let {createLine, centerText} = layoutDesign.designTheOutput();
        const boxWidth : number = 60; // Width of the box

        console.log(createLine(boxWidth, "="));
        console.log(centerText("Cart Items", boxWidth));

        this.items.forEach((currentItem, index) => {
            console.log(centerText(`Item #${index + 1}`, boxWidth));
            this.printItemDetails(currentItem);
        })

        console.log(createLine(boxWidth, "="));
    }

    public printItemDetails(currentItem : CartItem) : void {
        let {createLine} = layoutDesign.designTheOutput();
        const boxWidth : number = 60; // Width of the box

        console.log(createLine(boxWidth, "-"));
        console.log(`| Title       : ${currentItem.getItem().getTitle().padEnd(boxWidth - 17)}|`);
        console.log(`| Author      : ${currentItem.getItem().getAuthor().padEnd(boxWidth - 17)}|`);
        console.log(`| Price       : ${currentItem.getItem().getPrice().toString().padEnd(boxWidth - 17)}|`);
        console.log(`| Category    : ${currentItem.getItem().getCategory().padEnd(boxWidth - 17)}|`);
        console.log(`| Publisher   : ${currentItem.getItem().getPublisher().padEnd(boxWidth - 17)}|`);
        console.log(`| Quantity    : ${currentItem.getItem().toString().padEnd(boxWidth - 17)}|`);
        console.log(`| Total price : ${currentItem.getItem().toString().padEnd(boxWidth - 17)}|`);
        console.log(createLine(boxWidth, "-"));
    }
}