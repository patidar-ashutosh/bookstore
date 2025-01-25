import { Book } from "../books/Book";

export class CartItem {
  private totalPrice: number;

  constructor(private item: Book, private itemQuantity: number) {
    this.totalPrice = this.calculateTotal();
  }

  public getItem(): Book {
    return this.item;
  }

  public getItemQuantity(): number {
    return this.itemQuantity;
  }

  public getTotalPrice():number{
    return this.totalPrice;
  }

  private calculateTotal(): number {
    return this.getItem().getPrice() * this.getItemQuantity();
  }
}
