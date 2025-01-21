import { Book } from "../modules/books/Book";

export function quantityValidation(customerSelectBook: Book, quantity:number) : boolean {
    if(customerSelectBook.getQuantity() === 0) {
        console.log("Sorry (: this book is Out Of Stock ...\n");
        return false;
    } else if(customerSelectBook.getQuantity() < quantity) {
        console.log("Sorry (: we have only " + customerSelectBook.getQuantity() + " quantity of book ...\n");
        return false;
    }

    return true;
}