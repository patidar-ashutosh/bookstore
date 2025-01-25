import { Book } from "../books/Book";
import { paymentTypes } from "../enums/paymentTypes";
import { PaymentReceiptSchema } from "../payment/Payment";
import { Order } from "./Order";

export class DigitalOrder extends Order {

    constructor(product: Book[], totalPriceOfOrder:number, paymentDetail:PaymentReceiptSchema) {
        super(product, totalPriceOfOrder, paymentDetail);
    }
}