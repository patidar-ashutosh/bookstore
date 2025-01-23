import { designTheOutput } from "../../utilities/designTheOutput";
import { Book } from "../books/Book";
import { CartItem } from "../cart/CartItem";
import { Address } from "../customer/Address";
import { orderTypes } from "../enums/orderTypes";
import { PhysicalOrder } from "./PhysicalOrder";

export class Order {
    
    constructor(public products: CartItem[] | Book, public totalPriceOfOrder:number) {}

    printDetails() : void {
        let {createLine, centerText} = designTheOutput();
        const boxWidth : number = 60; // Width of the box

        if(typeof this.products) {            
            // this.products.forEach((product) => {
            //     console.log(`| Title       : ${product.book.getTitle().padEnd(boxWidth - 17)}|`);
            //     console.log(`| Author      : ${product.book.getAuthor().padEnd(boxWidth - 17)}|`);
            //     console.log(`| Price       : ${product.book.getPrice().toString().padEnd(boxWidth - 17)}|`);
            //     console.log(`| Category    : ${product.book.getCategory().padEnd(boxWidth - 17)}|`);
            //     console.log(`| Publisher   : ${product.book.getPublisher().padEnd(boxWidth - 17)}|`);
            //     console.log(`| Quantity    : ${product.bookQuantity.toString().padEnd(boxWidth - 17)}|`);
            //     console.log(`| Total Price : ${product.totalPrice.toString().toString().padEnd(boxWidth - 17)}|`);
            //     console.log(createLine(boxWidth, "-"));
            // })

            console.log(typeof this.products);
        }
 
        
        
        // console.log(`| Order Type       : ${this.orderType.padEnd(boxWidth - 22)}|`);
        // console.log(`| Payment Method   : ${this.type.padEnd(boxWidth - 22)}|`);
        // if(this.orderType === orderTypes.PHYSICAL && this.shippingAddress !== undefined) {
        //     console.log(createLine(boxWidth, "-"));
        //     console.log(centerText("Shipping Address", boxWidth));
        //     this.shippingAddress.printDetails();
        // }
        console.log(createLine(boxWidth, "-"));
    }
    
}