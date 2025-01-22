import { Book } from "../books/Book";
import { Cart } from "../cart/Cart";
import { CartItems } from "../cart/CartItems";
import { Address } from "../customer/Address";
import { Customer } from "../customer/Customer";

export class Order {
    public allProducts : CartItems[];
    public paymentType : string = "";
    public totalPriceOfOrder : number;
    public orderType : string;
    public shippingAddress : Address

    constructor(allProducts: CartItems[], totalPriceOfOrder:number, orderType:string, paymentType:string, shippingAddress:Address) {
        this.allProducts = allProducts;
        this.totalPriceOfOrder = totalPriceOfOrder;
        this.orderType = orderType;
        this.paymentType = paymentType;
        this.shippingAddress = shippingAddress;
    }

    printOrderDetails(currentOrder:Order) : void {
        // Helper function to create a horizontal line
        const createLine = (width: number, char: string = "-"): string => {
            return char.repeat(width);
        };
    
        const boxWidth : number = 60; // Width of the box

        currentOrder.allProducts.forEach((currentProduct) => {
            console.log(`| Title       : ${currentProduct.book.getTitle().padEnd(boxWidth - 17)}|`);
            console.log(`| Author      : ${currentProduct.book.getAuthor().padEnd(boxWidth - 17)}|`);
            console.log(`| Price       : ${currentProduct.book.getPrice().toString().padEnd(boxWidth - 17)}|`);
            console.log(`| Category    : ${currentProduct.book.getCategory().padEnd(boxWidth - 17)}|`);
            console.log(`| Publisher   : ${currentProduct.book.getPublisher().padEnd(boxWidth - 17)}|`);
            console.log(`| Quantity    : ${currentProduct.bookQuantity.toString().padEnd(boxWidth - 17)}|`);
            console.log(`| Total Price : ${currentProduct.totalPrice.toString().toString().padEnd(boxWidth - 17)}|`);
            console.log(createLine(boxWidth, "-"));
        })
        
        console.log(`| Order Type     : ${currentOrder.orderType.padEnd(boxWidth - 20)}|`);
        console.log(`| Payment Method : ${currentOrder.paymentType.padEnd(boxWidth - 20)}|`);
        console.log(`| Shipping Address : `);
        console.log(currentOrder.shippingAddress.address)
        console.log(createLine(boxWidth, "-"));
    }
}