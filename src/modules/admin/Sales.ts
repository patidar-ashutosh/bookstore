import { designTheOutput } from "../../utilities/designTheOutput";
import { Customer } from "../customer/Customer";

export class Sales {

    static customers : Customer[] = [];

    private isCustomerPresent(customer:Customer) : boolean {
        let isCustomerAlreadyPresent : boolean = false;
        Sales.customers.forEach((currentCustomer) => {
            if(currentCustomer.email === customer.email) {
                isCustomerAlreadyPresent = true;
            }
        })

        return isCustomerAlreadyPresent;
    }

    storeOrder(customer:Customer) : void {
        if(!this.isCustomerPresent(customer)) {
            Sales.customers.push(customer);
        }
    }

    showCustomersData() : void {
        if(Sales.customers.length === 0) {
            console.log("----------------- no record found -----------------\n");
            return;
        }

        let {createLine, centerText} = designTheOutput();
        const boxWidth : number = 60; // Width of the box

        console.log(createLine(boxWidth, "="));
        console.log(centerText("Customer Details", boxWidth));

        Sales.customers.forEach((currentCustomer, index) => {
            console.log(`Customer #${index + 1}`);
            console.log(createLine(boxWidth, "-"));
            console.log(`| Name         : ${currentCustomer.name.padEnd(boxWidth - 18)}|`);
            console.log(`| Email        : ${currentCustomer.email.padEnd(boxWidth - 18)}|`);
            console.log(`| Phone        : ${currentCustomer.phoneNumber.toString().padEnd(boxWidth - 18)}|`);
            // console.log(`| Address      : ${currentCustomer.address.padEnd(boxWidth - 18)}|`);
            console.log(`| Total Orders : ${currentCustomer.orders.length.toString().padEnd(boxWidth - 18)}|`);
            console.log(createLine(boxWidth, "-"));
        })

        console.log(createLine(boxWidth, "="));
    }

    showCustomerOrderHistoryDetails(customer: Customer) : void {
        if(Sales.customers.length === 0) {
            console.log("----------------- customer have no orders -----------------\n");
            return;
        }
    
        let {createLine, centerText} = designTheOutput();
        const boxWidth : number = 60; // Width of the box

        // Print customer details in a box
        console.log(createLine(boxWidth, "="));
        console.log(centerText("Customer Details", boxWidth));
        console.log(createLine(boxWidth, "="));

        console.log(`| Name         : ${customer.name.padEnd(boxWidth - 18)}|`);
        console.log(`| Email        : ${customer.email.padEnd(boxWidth - 18)}|`);
        console.log(`| Phone        : ${customer.phoneNumber.toString().padEnd(boxWidth - 18)}|`);
        // console.log(`| Address      : ${customer.address.padEnd(boxWidth - 18)}|`);
        console.log(`| Total Orders : ${(customer.orders.length).toString().padEnd(boxWidth - 18)}|`);
        console.log(createLine(boxWidth, "="));
    
        customer.showOrderHistory();
    }
}