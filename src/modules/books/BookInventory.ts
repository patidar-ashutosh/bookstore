import { designTheOutput } from "../../utilities/designTheOutput";
import { Book } from "./Book";

export class BookInventory {

    public static books : Book[] = [];

    addBook(newBook:Book) : void {
        BookInventory.books.push(newBook);
    }

    removeBook(book: Book) : void {
        let isBookNotFound : boolean = true;

        BookInventory.books.forEach((currentBook, index) => {
            if(currentBook.getBookId() === book.getBookId()) {
                isBookNotFound = false;
                BookInventory.books.splice(index, 1);
                console.log("-------------- Book remove successfully :) --------------\n");
            }
        })

        if(isBookNotFound) {
            console.log("Book not found!!!");
        }
    }

    showBooks() : void {
        let {createLine, centerText} = designTheOutput();
        const boxWidth : number = 60; // Width of the box

        console.log(createLine(boxWidth, "="));
        console.log(centerText("Book Details", boxWidth));

        BookInventory.books.forEach((currentBook, index) => {
            console.log(centerText(`Book #${index + 1}`, boxWidth));
            currentBook.printBookDetails();
        })

        console.log(createLine(boxWidth, "="));
    }

    searchBook(searchValue:string) : void {
        let isBookNotPresent : boolean = false;

        console.log("---------------------- Search Results ----------------------");

        BookInventory.books.forEach((currentBook) => {
            // Regular expression to match the whole word
            const isTitlePresent : boolean = new RegExp(`\\b${searchValue.toLowerCase()}\\b`).test(currentBook.getTitle().toLowerCase());
            const isAuthorPresent : boolean = new RegExp(`\\b${searchValue.toLowerCase()}\\b`).test(currentBook.getAuthor().toLowerCase());
            const isCategoryPresent : boolean = new RegExp(`\\b${searchValue.toLowerCase()}\\b`).test(currentBook.getCategory().toLowerCase());
            const isPublisherPresent : boolean = new RegExp(`\\b${searchValue.toLowerCase()}\\b`).test(currentBook.getPublisher().toLowerCase());

            if(isTitlePresent || isAuthorPresent || isCategoryPresent || isPublisherPresent) {
                currentBook.printBookDetails();
                isBookNotPresent = true;
            }
        })
        
        if(!isBookNotPresent) {
            console.log("-------------- Book not found (: --------------\n");
        }
    }
}