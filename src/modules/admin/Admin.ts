import { User } from "../../User";
import { Sales } from "./Sales";

export class Admin extends User {

    constructor(name:string, email:string, password:string) {
        super(name, email, password);
        User.allUsers.push(this);
    }
    
    private sales : Sales = new Sales();

    public showAllCustomerData = () => {
        this.sales.showAllCustomerData();
    }

    public showCustomerOrderHistoryDetails = () => {
        this.sales.showCustomerOrderHistoryDetails(Sales.allCustomers[0]);
    }
}