import { Order } from "../order/Order";

export class Sales {

    static allOrdersData : Order[] = [];

    storeOrder(newOrder: Order) : void {
        Sales.allOrdersData.push(newOrder);
    }
}