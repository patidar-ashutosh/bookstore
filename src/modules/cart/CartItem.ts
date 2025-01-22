import { Book } from "../books/Book";

export class CartItem {
    public book : Book;
    public bookQuantity : number;
    public totalPrice : number;

    constructor(selectedBook:Book, bookQuantity:number) {
        this.book = selectedBook;
        this.bookQuantity = bookQuantity;
        this.totalPrice = this.calculateTotal();
    }

    private calculateTotal() : number {
        return this.book.getPrice() * this.bookQuantity;
    }
}