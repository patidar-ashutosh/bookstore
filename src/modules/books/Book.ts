export class Book {
    constructor (public bookId:string, public title:string, public author:string, public price:number, public quantity:number, public category:string, public publisher:string) {
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

    printBookDetails(index:number) : void {
        console.log("-------------- Book Number : " + (index+1) + "--------------");
        console.log("title of book -> " + this.getTitle());
        console.log("author of book -> " + this.getAuthor());
        console.log("price of book -> " + this.getPrice());
        console.log("quantity of book -> " + this.getQuantity());
        console.log("category of book -> " + this.getCategory());
        console.log("publisher of book -> " + this.getPublisher());
        console.log("\n");
    }
}