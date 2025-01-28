import { layoutDesign } from "../../service/layoutDesign";

export class Book {
  constructor(
    private _bookId: string,
    private _title: string,
    private _author: string,
    private _price: number,
    private _quantity: number,
    private _category: string,
    private _publisher: string,
    private _isDigitallyAvailable: boolean
  ) {}

  public getBookId(): string {
    return this._bookId;
  }

  public getTitle(): string {
    return this._title;
  }

  public getAuthor(): string {
    return this._author;
  }

  public getPrice(): number {
    return this._price;
  }

  public getQuantity(): number {
    return this._quantity;
  }

  public setQuantity(quantity: number): void {
    this._quantity = quantity;
  }

  public getCategory(): string {
    return this._category;
  }

  public getPublisher(): string {
    return this._publisher;
  }

  public isDigitallyAvailable(): boolean {
    return this._isDigitallyAvailable;
  }

  public setIsDigitallyAvailable(newStatus: boolean): void {
    this._isDigitallyAvailable = newStatus;
  }

  public editBook(
    title: string,
    author: string,
    price: number,
    quantity: number,
    category: string,
    publisher: string
  ): void {
    this._title = title === "" ? this._title : title;
    this._author = author === "" ? this._author : author;
    this._price = price === 0 ? this._price : price;
    this._quantity = quantity === 0 ? this._quantity : quantity;
    this._category = category === "" ? this._category : category;
    this._publisher = publisher === "" ? this._publisher : publisher;
    console.log("-------------------- Modify Book Detail --------------------");
    this.printBookDetails();
  }

  public printBookDetails(): void {
    let { createLine } = layoutDesign.designTheOutput();
    const boxWidth: number = 60; // Width of the box

    console.log(createLine(boxWidth, "-"));
    console.log(`| Title     : ${this.getTitle().padEnd(boxWidth - 15)} |`);
    console.log(`| Author    : ${this.getAuthor().padEnd(boxWidth - 15)} |`);
    console.log(
      `| Price     : ${this.getPrice()
        .toString()
        .padEnd(boxWidth - 15)} |`
    );
    console.log(
      `| Quantity  : ${this.getQuantity()
        .toString()
        .padEnd(boxWidth - 15)} |`
    );
    console.log(`| Category  : ${this.getCategory().padEnd(boxWidth - 15)} |`);
    console.log(`| Publisher : ${this.getPublisher().padEnd(boxWidth - 15)} |`);
    console.log(
      `| Digitally Available : ${(this.isDigitallyAvailable()
        ? "Yes"
        : "No"
      ).padEnd(boxWidth - 24)} |`
    );
    console.log(createLine(boxWidth, "-"));
  }


}
