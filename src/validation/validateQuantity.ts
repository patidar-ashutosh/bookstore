import { Book } from "../modules/books/Book";

export function validateQuantity(book: Book, quantity:number) : boolean {
    if(book.getQuantity() === 0) {
        console.log("Sorry (: this book is Out Of Stock ...\n");
        return false;
    } else if(book.getQuantity() < quantity) {
        console.log("-------- Sorry (: we have only " + book.getQuantity() + " quantity of book --------");
        return false;
    }

    return true;
}