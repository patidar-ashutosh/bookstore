import { Sales } from "../admin/Sales";
import { User } from "../../User";
import { Payment, PaymentReceiptSchema } from "../payment/Payment";
import { Cart } from "../cart/Cart";
import { typeOfAddress } from "../enums/typeOfAddress";
import { Address } from "./Address";
import { CartItem } from "../cart/CartItem";
import { layoutDesign } from "../../service/layoutDesign";
import { BookInventory } from "../books/BookInventory";
import { Book } from "../books/Book";
import { DigitalOrder } from "../order/DigitalOrder";
import { PhysicalOrder } from "../order/PhysicalOrder";
import { CreditCard } from "../payment/PaymentMethods/CreditCard";

export class Customer extends User {
    public orders : (DigitalOrder | PhysicalOrder)[];
    public addresses : Address[];

    constructor(name:string, email:string, password:string, readonly phoneNumber:number) {
        super(name, email, password);
        this.phoneNumber = phoneNumber;
        this.orders = [];
        this.addresses = [];
    }

    private cart : Cart = new Cart();

    public getCart():Cart{
        return this.cart
    }

    public placeOrderWithPhysically() : void {
        if(this.getCart().getItems().length === 0) {
            console.log("------------ you have no item in cart yet :) ------------\n");
            return;
        }

        if(!this.isQuantityAvailableForCartItems()) {
            return;
        }

        let shippingAddress : Address = this.selectAddress();

        const payment:Payment = new Payment();

        let paymentReceipt : PaymentReceiptSchema | string =  payment.verify(new CreditCard( 123456789, "Himanshu", "12/25", 123 ));

        if(typeof(paymentReceipt)== 'string' ){
            console.log("~~~~~~~~~~ order not place because payment failed :) ~~~~~~~~~~");
                return;    
        }

        this.generateOrder(paymentReceipt,shippingAddress);

        const newSales : Sales = new Sales();
        newSales.storeOrder(this);

        this.getCart().empty();
        
        console.log("\n~~~~~~~~~~ order place successfully :) ~~~~~~~~~~ \n");
    }

    private isQuantityAvailableForCartItems() : boolean {
        let isQuantityAvailable : boolean = true;
        this.getCart().getItems().forEach((currentItem) => {
            if(currentItem.getItemQuantity() > currentItem.getItem().getQuantity()) {
                console.log(`For the book ( ${currentItem.getItem().getTitle()} ) we have only ${currentItem.getItem().getQuantity()} Quantity ...`);
                isQuantityAvailable = false;
                return;
            }
        })

        return isQuantityAvailable;
    }

    // private generateOrder(paymentType:string, shippingAddress:Address, paymentMethod:string) : void {
    //     let totalPriceOfOrder : number = 0;
    //     const products : CartItem[] = [];

    //     this.cart.items.forEach((currentItem) => {
    //         totalPriceOfOrder = totalPriceOfOrder + currentItem.totalPrice;
    //         products.push(currentItem);
    //         // update the quantity of books
    //         currentItem.book.setQuantity(currentItem.book.getQuantity() - currentItem.bookQuantity);
    //     })

    //     const order = new PhysicalOrder(products, totalPriceOfOrder, paymentType, shippingAddress, paymentMethod);
    //     this.orders.push(order);
    // }

    private generateOrder(paymentDetail:PaymentReceiptSchema, shippingAddress:Address) : void {
            let totalPriceOfOrder : number = 0;
            let products : CartItem[] = [];
    
            this.getCart().getItems().forEach((currentItem) => {
                totalPriceOfOrder += currentItem.getTotalPrice();
                products.push(currentItem);

                currentItem.getItem().setQuantity(currentItem.getItem().getQuantity() - currentItem.getItemQuantity());
            })
    
            const order = new PhysicalOrder(products, totalPriceOfOrder,paymentDetail, shippingAddress);
            this.orders.push(order);
        }


    public placeOrderWithDigital(indexOfBook:number) : void {
        const books : Book[] = BookInventory.books;
        const customerSelectedBook : Book = books[indexOfBook];

        if(!customerSelectedBook.isDigitallyAvailable()) {
            console.log("~~~~~~~~~~ Sorry ,but selected book is not available in Digital Format ~~~~~~~~~~");
            return;
        }

        const payment : Payment = new Payment();

        const paymentReceipt:PaymentReceiptSchema | string = payment.verify(new CreditCard( 123456789, "Himanshu", "12/25", 123 ))

        if(typeof(paymentReceipt)=='string') {
            console.log("~~~~~~~~~~ order not place because payment failed :) ~~~~~~~~~~");
            return;
        }

        const order:DigitalOrder = new DigitalOrder([customerSelectedBook], customerSelectedBook.getPrice(), paymentReceipt);
        console.log("\n~~~~~~~~~~ order place successfully :) ~~~~~~~~~~ \n");
        this.orders.push(order);
    }

    public showOrderHistory() : void {
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

    public addAddress(newAddress: Address) : void {
        this.addresses.push(newAddress);
    }

    public showAddresses() : void {
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

    public selectAddress() : Address {
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