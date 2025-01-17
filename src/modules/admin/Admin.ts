import { User } from "../../User";
import { BookInventory } from "../books/BookInventory";
import { Sales } from "./Sales";

export class Admin extends User{

    constructor(name:string, email:string, password:string) {
        super(name, email, password);
        User.allUsers.push(this);
    }

    public BookInventoryObject = new BookInventory();
    
    analyzeSales() {
        console.log("----------------- analyze sales -----------------\n");

        if(Sales.allOrdersData.length === 0) {
            console.log("----------------- no record found -----------------\n");
            return;
        }

        Sales.allOrdersData.forEach((order, index) => {
            console.log('--------------------- Order Number ' + (index + 1) + " ---------------------\n");
            console.log("---------- book details ----------");
            console.log("title of book -> " + order.book.getTitle());
            console.log("author of book -> " + order.book.getAuthor());
            console.log("price of book -> " + order.book.getPrice());
            console.log("category of book -> " + order.book.getCategory());
            console.log("publisher of book -> " + order.book.getPublisher());

            console.log("---------- order details ----------");
            console.log("quantity of book -> " + order.bookQuantity);
            console.log("total price of book -> " + order.totalPrice);
            console.log("order type of book -> " + order.orderType);

            console.log("---------- customer details ----------");
            console.log("customer name -> " + order.customer.name);
            console.log("customer email -> " + order.customer.email);
            console.log("customer phone number -> " + order.customer.phoneNumber);
            console.log("customer address -> " + order.customer.address);
            console.log("\n");
        });
    }

}