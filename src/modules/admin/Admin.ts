import { User } from "../../User";
import { Sales } from "./Sales";

export class Admin extends User {

    constructor(name:string, email:string, password:string) {
        super(name, email, password);
        User.users.push(this);
    }
    
    private sales : Sales = new Sales();

    public showCustomersData = () : void => {
        this.sales.showCustomersData();
    }

    public showCustomerOrderHistoryDetails = () : void => {
        this.sales.showCustomerOrderHistoryDetails(Sales.customers[0]);
    }
}