import { layoutDesign } from "../../service/layoutDesign";
import { Customer } from "../customer/Customer";

export class Sales {

    static customers : Customer[] = [];

    private isCustomerPresent(newCustomer:Customer) : boolean {
        let isCustomerAlreadyPresent : boolean = false;
        Sales.customers.forEach((customer) => {
            if(newCustomer.email === customer.email) {
                isCustomerAlreadyPresent = true;
            }
        })

        return isCustomerAlreadyPresent;
    }

    storeOrder(newCustomer:Customer) : void {
        if(!this.isCustomerPresent(newCustomer)) {
            Sales.customers.push(newCustomer);
        }
    }

    showCustomersInfo() : void {
        if(Sales.customers.length === 0) {
            console.log("----------------- no record found -----------------\n");
            return;
        }

        let {createLine, centerText} = layoutDesign.designTheOutput();
        const boxWidth : number = 60; // Width of the box

        console.log(createLine(boxWidth, "="));
        console.log(centerText("Customer Details", boxWidth));

        Sales.customers.forEach((customer, index) => {
            console.log(`Customer #${index + 1}`);
            console.log(createLine(boxWidth, "-"));
            console.log(`| Name         : ${customer.name.padEnd(boxWidth - 18)}|`);
            console.log(`| Email        : ${customer.email.padEnd(boxWidth - 18)}|`);
            console.log(`| Phone        : ${customer.phoneNumber.toString().padEnd(boxWidth - 18)}|`);
            console.log(`| Total Orders : ${customer.orders.length.toString().padEnd(boxWidth - 18)}|`);
            console.log(createLine(boxWidth, "-"));
        })

        console.log(createLine(boxWidth, "="));
    }

    showCustomerOrderHistory(customer: Customer) : void {
        if(Sales.customers.length === 0) {
            console.log("----------------- customer have no orders -----------------\n");
            return;
        }
    
        let {createLine, centerText} = layoutDesign.designTheOutput();
        const boxWidth : number = 60; // Width of the box

        // Print customer details in a box
        console.log(createLine(boxWidth, "="));
        console.log(centerText("Customer Details", boxWidth));
        console.log(createLine(boxWidth, "="));

        console.log(`| Name         : ${customer.name.padEnd(boxWidth - 18)}|`);
        console.log(`| Email        : ${customer.email.padEnd(boxWidth - 18)}|`);
        console.log(`| Phone        : ${customer.phoneNumber.toString().padEnd(boxWidth - 18)}|`);
        console.log(`| Total Orders : ${(customer.orders.length).toString().padEnd(boxWidth - 18)}|`);
        console.log(createLine(boxWidth, "="));
    
        customer.showOrderHistory();
    }
}