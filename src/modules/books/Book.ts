import { layoutDesign } from "../../service/layoutDesign";

export class Book {
    constructor (private bookId:string, private title:string, private author:string, private price:number, private quantity:number, private category:string, private publisher:string, private isDigitallyAvailable: boolean) {}

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

    setQuantity(quantity: number) : void {
        this.quantity = quantity;
    }

    getCategory() : string {
        return this.category;
    }

    getPublisher() : string {
        return this.publisher;
    }

    getIsDigitallyAvailable() : boolean {
        return this.isDigitallyAvailable;
    }

    setIsDigitallyAvailable(newStatus:boolean) : void {
        this.isDigitallyAvailable = newStatus;
    }

    printBookDetails() : void {
        let {createLine} = layoutDesign.designTheOutput();
        const boxWidth : number = 60; // Width of the box

        console.log(createLine(boxWidth, "-"));
        console.log(`| Title     : ${this.getTitle().padEnd(boxWidth - 15)} |`);
        console.log(`| Author    : ${this.getAuthor().padEnd(boxWidth - 15)} |`);
        console.log(`| Price     : ${this.getPrice().toString().padEnd(boxWidth - 15)} |`);
        console.log(`| Quantity  : ${this.getQuantity().toString().padEnd(boxWidth - 15)} |`);
        console.log(`| Category  : ${this.getCategory().padEnd(boxWidth - 15)} |`);
        console.log(`| Publisher : ${this.getPublisher().padEnd(boxWidth - 15)} |`);
        console.log(`| Digitally Available : ${(this.getIsDigitallyAvailable() ? "Yes" : "No").padEnd(boxWidth - 24)} |`);
        console.log(createLine(boxWidth, "-"));
    }

    editBook(title:string, author:string, price:number, quantity:number, category:string, publisher:string) : void {
        this.title = (title === "") ? this.title : title;
        this.author = (author === "") ? this.author : author;
        this.price = (price === 0) ? this.price : price;
        this.quantity = (quantity === 0) ? this.quantity : quantity;
        this.category = (category === "") ? this.category : category;
        this.publisher = (publisher === "") ? this.publisher : publisher;
        console.log("-------------------- Modify Book Detail --------------------");
        this.printBookDetails();
    }
}