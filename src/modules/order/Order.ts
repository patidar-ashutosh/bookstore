import { Book } from "../books/Book";
import { Customer } from "../customer/Customer";

export class Order {
    public book : Book;
    public customer : Customer;
    public bookQuantity:number;
    public totalPrice:number;
    public orderType:string = "";

    constructor(selectedBook:Book, currentCustomer:Customer, bookQuantity:number, orderType:string) {
        this.book = selectedBook;
        this.customer = currentCustomer;
        this.bookQuantity = bookQuantity;
        this.orderType = orderType;
        this.totalPrice = this.calculateTotal();
    }

    calculateTotal() : number {
        return this.book.getPrice() * this.bookQuantity;
    }

    printOrderDetails() {
        console.log("| title of book -> " + this.book.title);
        console.log("| author of book -> " + this.book.author);
        console.log("| price of book -> " + this.book.price);
        console.log("| category of book -> " + this.book.category);
        console.log("| publisher of book -> " + this.book.publisher);
        console.log("| quantity of book -> " + this.bookQuantity);
        console.log("| total price of book -> " + this.totalPrice);
        console.log("| order type of book -> " + this.orderType);

        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
    }
}