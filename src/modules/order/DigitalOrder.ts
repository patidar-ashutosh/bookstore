import { Book } from "../books/Book";
import { paymentTypes } from "../enums/paymentTypes";
import { Order } from "./Order";

export class DigitalOrder extends Order {

    constructor(product: Book[], totalPriceOfOrder:number, paymentMethod:string) {
        super(product, totalPriceOfOrder, "digital", paymentTypes.Online, paymentMethod);
    }

    paymentMethods() : void {
        console.log("select payment methods");
    }
}