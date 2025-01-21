export class Book {
    constructor (private bookId:string, private title:string, private author:string, private price:number, private quantity:number, private category:string, private publisher:string) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
        this.publisher = publisher;
    }

    getBookId() : string {
        return this.bookId;
    }

    getTitle() : string {
        return this.title;
    }

    getAuthor() : string {
        return this.author;
    }

    getPrice() : number {
        return this.price;
    }

    getQuantity() : number {
        return this.quantity;
    }

    setQuantity(quantity: number): void {
        if (quantity < 0 || this.quantity < quantity) {
            console.log("Quantity cannot be negative.");
            return;
        }
        this.quantity = quantity;
    }

    getCategory() : string {
        return this.category;
    }

    getPublisher() : string {
        return this.publisher;
    }

    printBookDetails() : void {
        console.log("title of book -> " + this.getTitle());
        console.log("author of book -> " + this.getAuthor());
        console.log("price of book -> " + this.getPrice());
        console.log("quantity of book -> " + this.getQuantity());
        console.log("category of book -> " + this.getCategory());
        console.log("publisher of book -> " + this.getPublisher());
        console.log("\n");
    }

    editBook(title:string, author:string, price:number, quantity:number, category:string, publisher:string) : void {
        this.title = (title === "") ? this.title : title;
        this.author = (author === "") ? this.author : author;
        this.price = (price === 0) ? this.price : price;
        this.quantity = (quantity === 0) ? this.quantity : quantity;
        this.category = (category === "") ? this.category : category;
        this.publisher = (publisher === "") ? this.publisher : publisher;
        console.log("-------------- print modify book details --------------\n");
        this.printBookDetails();
    }
}