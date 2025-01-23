import { layoutDesign } from "../../service/layoutDesign";
import { Book } from "../books/Book";
import { CartItem } from "../cart/CartItem";

export class Order {

    constructor(private products: CartItem[] | Book[], private totalPriceOfOrder:number,private orderType:string, private paymentType:string, readonly paymentMethod:string) {}

    printDetails() : void {
        let {createLine, centerText} = layoutDesign.designTheOutput();
        const boxWidth : number = 60; // Width of the box

        this.products.forEach((currentProduct) => {
            if(currentProduct instanceof CartItem) {
                console.log(createLine(boxWidth, "-"));
                this.printBookDetails(currentProduct.book);
                console.log(`| Quantity    : ${currentProduct.bookQuantity.toString().padEnd(boxWidth - 17)}|`);
                console.log(createLine(boxWidth, "-"));
            } else if(currentProduct instanceof Book) {
                this.printBookDetails(currentProduct);
            }
        })

        console.log(createLine(boxWidth, "-"));
        console.log(centerText("Order Details", boxWidth));
        console.log(`| Total Price    : ${this.totalPriceOfOrder.toString().toString().padEnd(boxWidth - 20)}|`);
        console.log(`| Order Type     : ${this.orderType.padEnd(boxWidth - 20)}|`);
        console.log(`| Payment Type   : ${this.paymentType.padEnd(boxWidth - 20)}|`);
        console.log(`| Payment Method : ${this.paymentMethod.padEnd(boxWidth - 20)}|`);
        console.log(createLine(boxWidth, "-"));
    }
 
    private printBookDetails(book : Book) : void {
        console.log(`| Title       : ${book.getTitle().padEnd(60 - 17)}|`);
        console.log(`| Author      : ${book.getAuthor().padEnd(60 - 17)}|`);
        console.log(`| Price       : ${book.getPrice().toString().padEnd(60 - 17)}|`);
        console.log(`| Category    : ${book.getCategory().padEnd(60 - 17)}|`);
        console.log(`| Publisher   : ${book.getPublisher().padEnd(60 - 17)}|`);
    }

}