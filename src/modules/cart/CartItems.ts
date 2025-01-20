import { Book } from "../books/Book";
import { Customer } from "../customer/Customer";

export class CartItems {
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

    private calculateTotal() : number {
        return this.book.getPrice() * this.bookQuantity;
    }
}