import { Book } from "../books/Book";
import { CartItems } from "../cart/CartItems";
import { Customer } from "../customer/Customer";

export class Order {

    public allProducts : CartItems[];

    constructor() {
        this.allProducts = [];
    }

    placeTheCartToOrder(currentCartItem: CartItems) {
        this.allProducts.push(currentCartItem);
    }

    printOrderDetails(currentOrder:CartItems[]) {
        currentOrder.forEach((currentProduct) => {
            console.log("| title of book -> " + currentProduct.book.title);
            console.log("| author of book -> " + currentProduct.book.author);
            console.log("| price of book -> " + currentProduct.book.price);
            console.log("| category of book -> " + currentProduct.book.category);
            console.log("| publisher of book -> " + currentProduct.book.publisher);
            console.log("| quantity of book -> " + currentProduct.bookQuantity);
            console.log("| total price of book -> " + currentProduct.totalPrice);
            console.log("| order type of book -> " + currentProduct.orderType);
    
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
        })

    }
}