import { Book } from "../books/Book";
import { BookInventory } from "../books/BookInventory";

export function findItemFromInventory(index:number):Book {
    return BookInventory.books[index]
}