import { BookInventory } from "../books/BookInventory";
import { Order } from "../order/Order";
import { Sales } from "../admin/Sales";
import { User } from "../../User";
import { paymentTypes } from '../enums/enumPaymentTypes';
import { Payments } from "../order/Payment";
import { quantityValidation } from "../../validation/quantityValidation";
import { Cart } from "../cart/Cart";
import { deliveryOptions } from "../enums/deliveryOptions";

export class Customer extends User {

    public confirmOrders : Order[];

    constructor(name:string, email:string, password:string, public phoneNumber:number, public address:string) {
        super(name, email, password);
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.confirmOrders = [];
        User.allUsers.push(this);
    }

    public cart = new Cart();

    placeOrder() {
        if(this.cart.cartItems.length === 0) {
            console.log("------------ you have no item in cart yet :) ------------\n");
            return;
        }

        let orderType = deliveryOptions.DIGITAL;

        const paymentObject = new Payments(paymentTypes.COD);
        const isPaymentDone = paymentObject.paymentNow();
        if(isPaymentDone) {

            const newSales = new Sales();

            this.cart.cartItems.forEach((currentIteam) => {
                currentIteam.orderType = orderType;
                this.confirmOrders.push(currentIteam);
                newSales.storeOrder(currentIteam);

                // update the quantity of books
                currentIteam.book.setQuantity(currentIteam.book.getQuantity() - currentIteam.bookQuantity);
            })

            // remove iteam from cart
            this.cart.cartItems = [];
            
            console.log("~~~~~~~~~~ order place successfully :) ~~~~~~~~~~");
        } else {
            console.log("order not place because payment failed :)");
        }
    }

    purchaseBook(indexOfBook:number, quantity:number) {
        const bookData = BookInventory.books;
        const customerSelectBook = bookData[indexOfBook];

        const orderType = deliveryOptions.PHYSICAL;
        
        let isQuantityAvailable = quantityValidation(customerSelectBook, quantity);

        if(!isQuantityAvailable) {
            return;
        }

        const paymentObject = new Payments(paymentTypes.COD);
        const isPaymentDone = paymentObject.paymentNow();
        if(isPaymentDone) {
            const orderRequest = new Order(customerSelectBook, this, quantity, orderType);
            this.confirmOrders.push(orderRequest);

            const newSales = new Sales();
            newSales.storeOrder(orderRequest);
            
            // update the quantity of books
            customerSelectBook.setQuantity(customerSelectBook.getQuantity() - quantity);
            
            console.log("~~~~~~~~~~ order place successfully :) ~~~~~~~~~~");
            orderRequest.printOrderDetails();

        } else {
            console.log("order not place because payment failed :)");
        }
    }

    getOrderHistory() {
        console.log("----------------- get order history -----------------\n");

        if(this.confirmOrders.length === 0) {
            console.log("------------ you have no orders yet :) ------------\n");
            return;
        }

        this.confirmOrders.forEach((currentOrder, index) => {
            console.log("~~~~~~~~~~ Order Number " + (index+1) + " ~~~~~~~~~~");
            currentOrder.printOrderDetails();
        })
    }
}