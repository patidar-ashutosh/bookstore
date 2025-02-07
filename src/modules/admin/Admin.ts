import { User } from "../../User";
import { Sales } from "./Sales";

export class Admin extends User {
    constructor(name:string, email:string, password:string) {
        super(name, email, password);
    }
    
    private sales : Sales = new Sales();

    public showCustomersInfo = () : void => {
        this.getSales().showCustomersInfo();
    }

    public showCustomerOrderHistory = () : void => {
        this.getSales().showCustomerOrderHistory(Sales.customers[0]);
    }

    private getSales():Sales{
        return this.sales
    }
}