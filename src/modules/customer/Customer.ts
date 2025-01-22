import { Order } from "../order/Order";
import { Sales } from "../admin/Sales";
import { User } from "../../User";
import { Payment } from "../order/Payment";
import { Cart } from "../cart/Cart";
import { orderTypes } from "../enums/orderTypes";
import { typeOfAddress } from "../enums/typeOfAddress";
import { Address } from "./Address";
import { CartItem } from "../cart/CartItem";
import { designTheOutput } from "../../utilities/designTheOutput";

export class Customer extends User {

    public orders : Order[];
    public addresses : Address[];

    constructor(name:string, email:string, password:string, readonly phoneNumber:number) {
        super(name, email, password);
        this.phoneNumber = phoneNumber;
        this.orders = [];
        this.addresses = [];
        User.users.push(this);
    }

    public cart : Cart = new Cart();

    placeOrder(orderType: orderTypes) : void {
        if(this.cart.items.length === 0) {
            console.log("------------ you have no item in cart yet :) ------------\n");
            return;
        }

        let shippingAddress : Address | undefined;

        if(orderType === orderTypes.PHYSICAL) {
            shippingAddress = this.selectAddress();
        }

        const paymentObject : Payment = new Payment();

        let isPaymentDone : boolean = paymentObject.makePayment(orderType);
        
        if(isPaymentDone) {
            let totalPriceOfOrder : number = 0;
            const products : CartItem[] = [];

            this.cart.items.forEach((currentIteam) => {
                totalPriceOfOrder = totalPriceOfOrder + currentIteam.totalPrice;
                products.push(currentIteam);
                // update the quantity of books
                currentIteam.book.setQuantity(currentIteam.book.getQuantity() - currentIteam.bookQuantity);
            })

            // create new order
            let order : Order;
            if(orderType === orderTypes.DIGITAL) {
                order = new Order(products, totalPriceOfOrder, orderType, paymentObject.type);
            } else {
                order = new Order(products, totalPriceOfOrder, orderType, paymentObject.type, shippingAddress);
            }

            this.orders.push(order);

            const newSales : Sales = new Sales();
            newSales.storeOrder(this);

            // remove iteam from cart
            this.cart.items = [];
            
            console.log("~~~~~~~~~~ order place successfully :) ~~~~~~~~~~");
        } else {
            console.log("order not place because payment failed :)");
        }
    }

    buyNow(indexOfBook:number, quantity:number,orderType: orderTypes) : void {
        let isItemAddedInCart : boolean = this.cart.addItem(indexOfBook, quantity);
        if(isItemAddedInCart) {
            this.placeOrder(orderType);
        }
    }

    showOrderHistory() : void {
        
        let {createLine, centerText} = designTheOutput();
        const boxWidth : number = 60; // Width of the box
        
        console.log(createLine(boxWidth, "="));
        console.log(centerText("Order History", boxWidth));
        
        if(this.orders.length === 0) {
            console.log("------------ you have no orders yet :) ------------\n");
            console.log(createLine(boxWidth, "="));
            console.log("\n");
            return;
        }

        this.orders.forEach((currentOrder, index) => {
            console.log(createLine(boxWidth, "-"));
            console.log(`| Order #${index + 1}`.padEnd(boxWidth - 1) + "|");
            console.log(createLine(boxWidth, "-"));

            // print one by one order details
            currentOrder.printOrderDetails(currentOrder);
        })

        console.log(createLine(boxWidth, "="));
    }

    addAddress(newAddress: Address) : void {
        this.addresses.push(newAddress);
    }

    showAddresses() : void {
        this.addresses.forEach((currentAddress) => {
            console.log(currentAddress.address);
        })
    }

    selectAddress() : Address {
        // select address
        console.log("~~~~~~~~~~ Select your shipping address :) ~~~~~~~~~~");
        
        let shippingAddress : Address;
        let isCustomerAddNewAddress : boolean = true;

        if(this.addresses.length !== 0) {
            this.showAddresses();
            console.log("add new address ??");
            isCustomerAddNewAddress = true;
        }

        if(isCustomerAddNewAddress) {
            console.log("~~~~~~~~~~ Add new address :) ~~~~~~~~~~\n");
            this.addAddress(new Address("3", "3", 3, "3", "3", typeOfAddress.HOME));
            shippingAddress = this.addresses[this.addresses.length-1];
        } else {
            // means customer select address from already added addresses
            shippingAddress = this.addresses[0];
        }

        console.log("~~~~~~~~~~ Address selected successfully :) ~~~~~~~~~~\n");

        return shippingAddress;
    }
}