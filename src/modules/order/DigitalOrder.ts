import { Book } from "../books/Book";
import { Order } from "./Order";

export class DigitalOrder extends Order {

    constructor(product: Book, totalPriceOfOrder:number) {
        super(product, totalPriceOfOrder);
    }

    paymentMethods() : void {
        console.log("select payment methods");
    }
}