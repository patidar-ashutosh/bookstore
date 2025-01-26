import { layoutDesign } from "../../service/layoutDesign";
import { Book } from "../books/Book";
import { Cart } from "../cart/Cart";
import { CartItem } from "../cart/CartItem";
import { Address } from "../customer/Address";
import { Customer } from "../customer/Customer";
import { PaymentReceiptSchema } from "../payment/Payment";
import { DigitalOrder } from "./DigitalOrder";
import { PhysicalOrder } from "./PhysicalOrder";

export abstract class Order {
    constructor(private products: CartItem[], private totalPriceOfOrder:number,private paymentDetail:PaymentReceiptSchema) {}

    public getProducts():CartItem[]{
        return this.products;
    }

    public static createOrder<TypeOfOrder extends DigitalOrder | PhysicalOrder>(customer:Customer,paymentDetail:PaymentReceiptSchema,shippingAddress?:Address):TypeOfOrder{

        let totalPriceOfOrder : number = 0;
        let products : CartItem[] = [];

        customer.getCart().getItems().forEach((currentItem:CartItem)=>{
            totalPriceOfOrder += currentItem.getTotalPrice();
            products.push(currentItem);
        })

        if(shippingAddress){
            Order.quantityDecreaser(customer.getCart());
            return new PhysicalOrder(products,totalPriceOfOrder,paymentDetail,shippingAddress) as TypeOfOrder
        }

        return new DigitalOrder(products,totalPriceOfOrder,paymentDetail) as TypeOfOrder

    }

    private static quantityDecreaser(cart:Cart){
        cart.getItems().forEach((currentCartItem:CartItem)=>{
            currentCartItem.getItem().setQuantity(currentCartItem.getItem().getQuantity()-currentCartItem.getItemQuantity());
        })
    }

    public printDetails() : void {
        let {createLine, centerText} = layoutDesign.designTheOutput();
        const boxWidth : number = 60; // Width of the box

        this.getProducts().forEach((currentProduct) => {
                console.log(createLine(boxWidth, "-"));
                this.printBookDetails(currentProduct.getItem());
                console.log(`| Quantity    : ${currentProduct.getItemQuantity().toString().padEnd(boxWidth - 17)}|`);
                console.log(createLine(boxWidth, "-"));
        })

        // console.log(createLine(boxWidth, "-"));
        // console.log(centerText("Order Details", boxWidth));
        // console.log(`| Total Price    : ${this.totalPriceOfOrder.toString().toString().padEnd(boxWidth - 20)}|`);
        // console.log(`| Order Type     : ${this.orderType.padEnd(boxWidth - 20)}|`);
        // console.log(`| Payment Type   : ${this.paymentType.padEnd(boxWidth - 20)}|`);
        // console.log(`| Payment Method : ${this.paymentMethod.padEnd(boxWidth - 20)}|`);
        // console.log(createLine(boxWidth, "-"));
    }
 
    private printBookDetails(book : Book) : void {
        console.log(`| Title       : ${book.getTitle().padEnd(60 - 17)}|`);
        console.log(`| Author      : ${book.getAuthor().padEnd(60 - 17)}|`);
        console.log(`| Price       : ${book.getPrice().toString().padEnd(60 - 17)}|`);
        console.log(`| Category    : ${book.getCategory().padEnd(60 - 17)}|`);
        console.log(`| Publisher   : ${book.getPublisher().padEnd(60 - 17)}|`);
    }

}