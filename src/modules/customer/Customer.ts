import { Sales } from "../admin/Sales";
import { User } from "../../User";
import { Payment } from "../payment/Payment";
import { Cart } from "../cart/Cart";
import { typeOfAddress } from "../enums/typeOfAddress";
import { Address } from "./Address";
import { CartItem } from "../cart/CartItem";
import { layoutDesign } from "../../service/layoutDesign";
import { BookInventory } from "../books/BookInventory";
import { Book } from "../books/Book";
import { DigitalOrder } from "../order/DigitalOrder";
import { PhysicalOrder } from "../order/PhysicalOrder";
import { paymentTypes } from "../enums/paymentTypes";

export class Customer extends User {
    public orders : (DigitalOrder | PhysicalOrder)[];
    public addresses : Address[];

    constructor(name:string, email:string, password:string, readonly phoneNumber:number) {
        super(name, email, password);
        this.phoneNumber = phoneNumber;
        this.orders = [];
        this.addresses = [];
    }

    public cart : Cart = new Cart();

    placeOrderWithPhyically() : void {
        if(this.cart.items.length === 0) {
            console.log("------------ you have no item in cart yet :) ------------\n");
            return;
        }

        // check that the quantity is avaliable for all cart items
        if(!this.isQuantityAvaliableForCartItems()) {
            return;
        }

        let shippingAddress : Address;
        shippingAddress = this.selectAddress();

        const paymentObject : Payment = new Payment();
        let paymemtType = paymentTypes.COD;

        let isPaymentDone : boolean = paymentObject.makePayment(paymemtType);

        if(!isPaymentDone) {
            console.log("~~~~~~~~~~ order not place because payment failed :) ~~~~~~~~~~");
            return;
        }

        this.generateOrder(paymemtType, shippingAddress, paymentObject.paymentMethod);

        const newSales : Sales = new Sales();
        newSales.storeOrder(this);

        // remove iteam from cart
        this.cart.items = [];
        
        console.log("\n~~~~~~~~~~ order place successfully :) ~~~~~~~~~~ \n");
    }

    private isQuantityAvaliableForCartItems() : boolean {
        let isQuantityAvailable : boolean = true;
        this.cart.items.forEach((currentIteam) => {
            // check that the quantity is avaliable
            if(currentIteam.bookQuantity > currentIteam.book.getQuantity()) {
                console.log(`For the book ( ${currentIteam.book.getTitle()} ) we have only ${currentIteam.book.getQuantity()} Quantity ...`);
                isQuantityAvailable = false;
                return;
            }
        })

        return isQuantityAvailable;
    }

    private generateOrder(paymemtType:string, shippingAddress:Address, paymentMethod:string) : void {
        let totalPriceOfOrder : number = 0;
        const products : CartItem[] = [];

        this.cart.items.forEach((currentIteam) => {
            totalPriceOfOrder = totalPriceOfOrder + currentIteam.totalPrice;
            products.push(currentIteam);
            // update the quantity of books
            currentIteam.book.setQuantity(currentIteam.book.getQuantity() - currentIteam.bookQuantity);
        })

        const order = new PhysicalOrder(products, totalPriceOfOrder, paymemtType, shippingAddress, paymentMethod);
        this.orders.push(order);
    }

    placeOrderWithDigital(indexOfBook:number) : void {
        const books : Book[] = BookInventory.books;
        const customerSelectedBook : Book = books[indexOfBook];

        if(!customerSelectedBook.getisDigitallyAvailable()) {
            console.log("~~~~~~~~~~ selected book is not avaliable in Digitally ~~~~~~~~~~");
            return;
        }

        const paymentObject : Payment = new Payment();
        let paymemtType = paymentTypes.Online;

        let isPaymentDone : boolean = paymentObject.makePayment(paymemtType);

        if(!isPaymentDone) {
            console.log("~~~~~~~~~~ order not place because payment failed :) ~~~~~~~~~~");
            return;
        }

        const order = new DigitalOrder([customerSelectedBook], customerSelectedBook.getPrice(), paymentObject.paymentMethod);
        console.log("\n~~~~~~~~~~ order place successfully :) ~~~~~~~~~~ \n");
        this.orders.push(order);
    }

    showOrderHistory() : void {
        let {createLine, centerText} = layoutDesign.designTheOutput();
        const boxWidth : number = 60; // Width of the box
        
        console.log(createLine(boxWidth, "="));
        console.log(centerText("Order History", boxWidth));
        
        if(this.orders.length === 0) {
            console.log(centerText("you have no orders yet :)", boxWidth));
            console.log(createLine(boxWidth, "="));
            console.log("\n");
            return;
        }

        this.orders.forEach((currentOrder, index) => {
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
        let {createLine, centerText} = layoutDesign.designTheOutput();
        const boxWidth : number = 60; // Width of the box
        
        console.log(createLine(boxWidth, "-"));
        console.log(centerText("All Address", boxWidth));
        console.log(createLine(boxWidth, "-"));

        this.addresses.forEach((currentAddress, index) => {
            console.log(centerText(`Address #${index + 1}`, boxWidth));
            currentAddress.printDetails();
            console.log(createLine(boxWidth, "-"));
        })
    }

    selectAddress() : Address {
        // select address
        let {createLine, centerText} = layoutDesign.designTheOutput();
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