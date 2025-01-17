import { Book } from "./Book";

export class BookInventory {

    public static books : Book[] = [];

    addBook(bookId:string, title:string, author:string, price:number, quantity:number, category:string, publisher:string){
        const newBook = new Book(bookId, title, author, price, quantity, category, publisher);
        BookInventory.books.push(newBook);
    }

    editBook(index:number, title:string, author:string, price:number, quantity:number, category:string, publisher:string){
        let bookData = BookInventory.books[index];
        bookData.title = (title === "") ? bookData.title : title;
        bookData.author = (author === "") ? bookData.author : author;
        bookData.price = (price === 0) ? bookData.price : price;
        bookData.quantity = (quantity === 0) ? bookData.quantity : quantity;
        bookData.category = (category === "") ? bookData.category : category;
        bookData.publisher = (publisher === "") ? bookData.publisher : publisher;

        console.log("-------------- print modify book details --------------\n");
        bookData.printBookDetails(index);
    }

    removeBook(bookId: string){
        let isBookNotFound = true;

        BookInventory.books.forEach((currentBook, index) => {
            if(currentBook.getBookId() === bookId) {
                isBookNotFound = false;
                BookInventory.books.splice(index, 1);
                console.log("-------------- Book remove successfully :) --------------\n");
            }
        })

        if(isBookNotFound) {
            console.log("Book not found!!!");
        }
    }

    getAllBooks(){
        console.log("----------------- print all book details -----------------\n");

        BookInventory.books.forEach((currentBook, index) => {
            currentBook.printBookDetails(index);
        })
    }

    searchBook(searchValue:string){
        let isBookNotPresent = false;

        console.log("-------------- Search Result : --------------\n");

        BookInventory.books.forEach((currentBook, index) => {
            // Regular expression to match the whole word
            const isTitlePresent = new RegExp(`\\b${searchValue.toLowerCase()}\\b`).test(currentBook.getTitle().toLowerCase());
            const isAuthorPresent = new RegExp(`\\b${searchValue.toLowerCase()}\\b`).test(currentBook.getAuthor().toLowerCase());
            const isCategoryPresent = new RegExp(`\\b${searchValue.toLowerCase()}\\b`).test(currentBook.getCategory().toLowerCase());
            const isPublisherPresent = new RegExp(`\\b${searchValue.toLowerCase()}\\b`).test(currentBook.getPublisher().toLowerCase());

            if(isTitlePresent || isAuthorPresent || isCategoryPresent || isPublisherPresent) {
                currentBook.printBookDetails(index);
                isBookNotPresent = true;
            }
        })
        
        if(!isBookNotPresent) {
            console.log("-------------- Book not found (: --------------\n");
        }
    }
}