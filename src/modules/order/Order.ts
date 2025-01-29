import { layoutDesign } from "../../service/layoutDesign";
import { Book } from "../books/Book";
import { CartItem } from "../cart/CartItem";
import { PaymentReceipt } from "../payment/PaymentStructure";
export class Order {
  constructor(
    public products: CartItem[],
    public totalPriceOfOrder: number,
    public paymentDetail: PaymentReceipt,
    public orderType: string
  ) {}

  public getProducts(): CartItem[] {
    return this.products;
  }

  public getTotalPriceOfOrder(): number {
    return this.totalPriceOfOrder;
  }

  public getPaymentDetail(): PaymentReceipt {
    return this.paymentDetail;
  }

  public printDetails(): void {
    let { createLine, centerText } = layoutDesign.designTheOutput();
    const boxWidth: number = 60; // Width of the box

    this.getProducts().forEach((currentProduct) => {
      console.log(createLine(boxWidth, "-"));
      this.printBookDetails(currentProduct.getItem());
      console.log(
        `| Quantity    : ${currentProduct
          .getItemQuantity()
          .toString()
          .padEnd(boxWidth - 17)}|`
      );
      console.log(createLine(boxWidth, "-"));
    });

    console.log(createLine(boxWidth, "-"));
    console.log(centerText("Order Details", boxWidth));
    console.log(
      `| Total Price    : ${this.totalPriceOfOrder
        .toString()
        .toString()
        .padEnd(boxWidth - 20)}|`
    );
    console.log(`| Order Type     : ${this.orderType.padEnd(boxWidth - 20)}|`);
    // console.log(`| Payment Type   : ${this.paymentType.padEnd(boxWidth - 20)}|`);
    // console.log(`| Payment Method : ${this.paymentMethod.padEnd(boxWidth - 20)}|`);
    console.log(createLine(boxWidth, "-"));
  }

  private printBookDetails(book: Book): void {
    console.log(`| Title       : ${book.getTitle().padEnd(60 - 17)}|`);
    console.log(`| Author      : ${book.getAuthor().padEnd(60 - 17)}|`);
    console.log(
      `| Price       : ${book
        .getPrice()
        .toString()
        .padEnd(60 - 17)}|`
    );
    console.log(`| Category    : ${book.getCategory().padEnd(60 - 17)}|`);
    console.log(`| Publisher   : ${book.getPublisher().padEnd(60 - 17)}|`);
  }
}
