import { User } from "../../User";
import { Sales } from "./Sales";

export class Admin extends User {

    constructor(name:string, email:string, password:string) {
        super(name, email, password);
        User.users.push(this);
    }
    
    private sales : Sales = new Sales();

    public showCustomersInfo = () : void => {
        this.sales.showCustomersInfo();
    }

    public showCustomerOrderHistory = () : void => {
        this.sales.showCustomerOrderHistory(Sales.customers[0]);
    }
}