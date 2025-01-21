import { BookInventory } from "../books/BookInventory";
import { Order } from "../order/Order";
import { Sales } from "../admin/Sales";
import { User } from "../../User";
import { paymentTypes } from '../enums/enumPaymentTypes';
import { Payments } from "../order/Payment";
import { Cart } from "../cart/Cart";
import { deliveryOptions } from "../enums/deliveryOptions";
import { CartItems } from "../cart/CartItems";

export class Customer extends User {

    public allOrders : Order[];

    constructor(name:string, email:string, password:string, readonly phoneNumber:number, readonly address:string) {
        super(name, email, password);
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.allOrders = [];
        User.allUsers.push(this);
    }

    public cart : Cart = new Cart();

    placeOrder() : void {
        if(this.cart.allCartItems.length === 0) {
            console.log("------------ you have no item in cart yet :) ------------\n");
            return;
        }

        let orderType : deliveryOptions = deliveryOptions.DIGITAL;
        let paymentType : paymentTypes = paymentTypes.COD;
        
        const paymentObject : Payments = new Payments(paymentType);
        const isPaymentDone : boolean = paymentObject.paymentNow();
        
        if(isPaymentDone) {
            let totalPriceOfOrder : number = 0;
            const allProducts : CartItems[] = [];

            this.cart.allCartItems.forEach((currentIteam) => {
                totalPriceOfOrder = totalPriceOfOrder + currentIteam.totalPrice;
                allProducts.push(currentIteam);
                // update the quantity of books
                currentIteam.book.setQuantity(currentIteam.book.getQuantity() - currentIteam.bookQuantity);
            })

            // create new order
            const orders : Order = new Order(allProducts, totalPriceOfOrder, orderType, paymentType);
            this.allOrders.push(orders);

            const newSales : Sales = new Sales();
            newSales.storeOrder(this);

            // remove iteam from cart
            this.cart.allCartItems = [];
            
            console.log("~~~~~~~~~~ order place successfully :) ~~~~~~~~~~");
        } else {
            console.log("order not place because payment failed :)");
        }
    }

    buyNow(indexOfBook:number, quantity:number) : void {
        let isItemAddedInCart : boolean = this.cart.addToCart(indexOfBook, quantity);
        if(isItemAddedInCart) {
            this.placeOrder();
        }
    }

    showOrderHistory() : void {
        // Helper function to create a horizontal line
        const createLine = (width: number, char: string = "-"): string => {
            return char.repeat(width);
        };
    
        // Helper function to center-align text within a box
        const centerText = (text: string, width: number): string => {
            const space = Math.max(0, width - text.length);
            const padStart = Math.floor(space / 2);
            const padEnd = space - padStart;
            return " ".repeat(padStart) + text + " ".repeat(padEnd);
        };
    
        const boxWidth : number = 60; // Width of the box
        
        console.log(createLine(boxWidth, "="));
        console.log(centerText("Order History", boxWidth));
        
        if(this.allOrders.length === 0) {
            console.log("------------ you have no orders yet :) ------------\n");
            console.log(createLine(boxWidth, "="));
            console.log("\n");
            return;
        }

        this.allOrders.forEach((currentOrder, index) => {
            console.log(createLine(boxWidth, "-"));

            console.log(`| Order #${index + 1}`.padEnd(boxWidth - 1) + "|");

            console.log(createLine(boxWidth, "-"));

            // print one by one order details
            currentOrder.printOrderDetails(currentOrder);
        })

        console.log(createLine(boxWidth, "="));
    }
}