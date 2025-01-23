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
import { BookInventory } from "../books/BookInventory";
import { Book } from "../books/Book";
import { DigitalOrder } from "../order/DigitalOrder";
import { PhysicalOrder } from "../order/PhysicalOrder";

export class Customer extends User {
    public orders : (DigitalOrder | PhysicalOrder)[];
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
    

        
        
        
    }

    private generateOrder(orderType: orderTypes, paymemtType:string, shippingAddress:Address| undefined) : void {
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
            order = new Order(products, totalPriceOfOrder, orderType, paymemtType);
        } else {
            order = new Order(products, totalPriceOfOrder, orderType, paymemtType, shippingAddress);
        }

        this.orders.push(order);
    }

    placeOrderWithPhyically() : void {
        if(this.cart.items.length === 0) {
            console.log("------------ you have no item in cart yet :) ------------\n");
            return;
        }

        let shippingAddress : Address;
        shippingAddress = this.selectAddress();

        const paymentObject : Payment = new Payment();

        let isPaymentDone : boolean = paymentObject.makePayment();


        if(!isPaymentDone) {
            console.log("order not place because payment failed :)");
            return;
        }

        this.generateOrder(paymentObject.type, shippingAddress);

        const newSales : Sales = new Sales();
        newSales.storeOrder(this);

        // remove iteam from cart
        this.cart.items = [];
        
        console.log("\n ~~~~~~~~~~ order place successfully :) ~~~~~~~~~~ \n");

    }

    placeOrderWithDigital(indexOfBook:number) : void {
        const books : Book[] = BookInventory.books;
        const customerSelectedBook : Book = books[indexOfBook];

        if(!customerSelectedBook.getIsPhysicalAvailable()) {
            console.log("selected book is not avaliable in Physicaliy");
            return;
        }

        const order = new DigitalOrder(customerSelectedBook, customerSelectedBook.getPrice());

        this.orders.push(order);
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
            console.log('\n');
            console.log(createLine(boxWidth, "-"));
            console.log(`| Order #${index + 1}`.padEnd(boxWidth - 1) + "|");
            console.log(createLine(boxWidth, "-"));

            // print one by one order details
            currentOrder.printDetails();
        })

        console.log(createLine(boxWidth, "="));
    }

    addAddress(newAddress: Address) : void {
        this.addresses.push(newAddress);
    }

    showAddresses() : void {
        let {createLine, centerText} = designTheOutput();
        const boxWidth : number = 60; // Width of the box
        
        console.log(createLine(boxWidth, "-"));
        console.log(centerText("All Address", boxWidth));
        console.log(createLine(boxWidth, "-"));

        this.addresses.forEach((currentAddress, index) => {
            console.log(centerText(`Address #${index + 1}`, boxWidth));
            currentAddress.printDetails();
        })
    }

    selectAddress() : Address {
        // select address
        let {createLine, centerText} = designTheOutput();
        const boxWidth : number = 60; // Width of the box
        
        console.log("\n");
        console.log(createLine(boxWidth, "="));
        console.log(centerText(`~~~~~ Select your shipping address :) ~~~~~`, boxWidth));
        
        let shippingAddress : Address;
        let isCustomerAddNewAddress : boolean = true;

        if(this.addresses.length !== 0) {
            this.showAddresses();
            console.log(centerText(`~~~~~ You want to add new address ??? ~~~~~`, boxWidth));
            isCustomerAddNewAddress = true;
        }

        if(isCustomerAddNewAddress) {
            console.log(centerText(`~~~~~ Enter details of new address ~~~~~`, boxWidth));
            this.addAddress(new Address("3", "3", 3, "3", "3", typeOfAddress.HOME));
            shippingAddress = this.addresses[this.addresses.length-1];
        } else {
            // means customer select address from already added addresses
            shippingAddress = this.addresses[0];
        }

        console.log(createLine(boxWidth, "-"));
        console.log(centerText(`Address selected successfully :)`, boxWidth));
        console.log(createLine(boxWidth, "-"));

        console.log(createLine(boxWidth, "="));
        console.log("\n");

        return shippingAddress;
    }
}