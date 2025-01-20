import { CartItems } from "../cart/CartItems";
import { Customer } from "../customer/Customer";
import { Order } from "../order/Order";

interface singObj {
    order:[CartItems[]];
    customer:Customer;
}

export class Sales {

    static allOrdersData : [{}] = [{}];

    constructor(order:[CartItems[]], customer:Customer) {
        Sales.allOrdersData.push({order, customer});
    }

    // storeOrder(newOrder: CartItems) : void {
    //     Sales.allOrdersData.push(newOrder);
    // }

    analyzeSales() {
        console.log("----------------- analyze sales -----------------\n");

        // if(Sales.allOrdersData.length === 0) {
        //     console.log("----------------- no record found -----------------\n");
        //     return;
        // }

        console.log(Sales.allOrdersData);

        Sales.allOrdersData.splice(0,1);

        // Sales.allOrdersData.forEach((singleObject : singObj, index) => {
        //     if(singleObject) {
        //         console.log(singleObject['order']);
        //     }
        //     // if(index !== 0 && Object.hasOwnProperty('order')) {
        //     // }
        // })

            // console.log("title of book -> " + order.book.getTitle());
            // console.log("author of book -> " + order.book.getAuthor());
            // console.log("price of book -> " + order.book.getPrice());
            // console.log("category of book -> " + order.book.getCategory());
            // console.log("publisher of book -> " + order.book.getPublisher());

            // console.log("---------- order details ----------");
            // console.log("quantity of book -> " + order.bookQuantity);
            // console.log("total price of book -> " + order.totalPrice);
            // console.log("order type of book -> " + order.orderType);

            // console.log("---------- customer details ----------");
            // console.log("customer name -> " + order.customer.name);
            // console.log("customer email -> " + order.customer.email);
            // console.log("customer phone number -> " + order.customer.phoneNumber);
            // console.log("customer address -> " + order.customer.address);
    }
}