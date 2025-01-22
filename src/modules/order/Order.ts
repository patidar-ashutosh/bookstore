import { designTheOutput } from "../../utilities/designTheOutput";
import { CartItem } from "../cart/CartItem";
import { Address } from "../customer/Address";
import { orderTypes } from "../enums/orderTypes";

export class Order {
    
    constructor(public products: CartItem[], public totalPriceOfOrder:number, public orderType:string, public type:string, public shippingAddress?:Address) {}

    printDetails() : void {
        let {createLine, centerText} = designTheOutput();
        const boxWidth : number = 60; // Width of the box
        
        this.products.forEach((product) => {
            console.log(`| Title       : ${product.book.getTitle().padEnd(boxWidth - 17)}|`);
            console.log(`| Author      : ${product.book.getAuthor().padEnd(boxWidth - 17)}|`);
            console.log(`| Price       : ${product.book.getPrice().toString().padEnd(boxWidth - 17)}|`);
            console.log(`| Category    : ${product.book.getCategory().padEnd(boxWidth - 17)}|`);
            console.log(`| Publisher   : ${product.book.getPublisher().padEnd(boxWidth - 17)}|`);
            console.log(`| Quantity    : ${product.bookQuantity.toString().padEnd(boxWidth - 17)}|`);
            console.log(`| Total Price : ${product.totalPrice.toString().toString().padEnd(boxWidth - 17)}|`);
            console.log(createLine(boxWidth, "-"));
        })
        
        console.log(`| Order Type       : ${this.orderType.padEnd(boxWidth - 22)}|`);
        console.log(`| Payment Method   : ${this.type.padEnd(boxWidth - 22)}|`);
        if(this.orderType === orderTypes.PHYSICAL && this.shippingAddress !== undefined) {
            console.log(createLine(boxWidth, "-"));
            console.log(centerText("Shipping Address", boxWidth));
            this.shippingAddress.printDetails();
        }
        console.log(createLine(boxWidth, "-"));
    }
    
}