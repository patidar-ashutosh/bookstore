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

    showAllBooks() : void {
        console.log("----------------- print all book details -----------------\n");

        BookInventory.books.forEach((currentBook, index) => {
            console.log("-------------- Book Number : " + (index+1) + "--------------");
            currentBook.printBookDetails();
        })
    }

    searchBook(searchValue:string) : void {
        let isBookNotPresent : boolean = false;

        console.log("-------------- Search Result : --------------\n");

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