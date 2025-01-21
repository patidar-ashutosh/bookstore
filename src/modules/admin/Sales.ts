import { Customer } from "../customer/Customer";

export class Sales {

    static allCustomers : Customer[] = [];

    private isCustomerPresent(customer:Customer) : boolean {
        let isCustomerAlreadyPresent : boolean = false;
        Sales.allCustomers.forEach((currentCustomer) => {
            if(currentCustomer.email === customer.email) {
                isCustomerAlreadyPresent = true;
            }
        })

        return isCustomerAlreadyPresent;
    }

    storeOrder(customer:Customer) : void {
        if(!this.isCustomerPresent(customer)) {
            Sales.allCustomers.push(customer);
        }
    }

    designTheOutput() {
        // Helper function to create a horizontal line
        const createLine = (width: number, char: string = "-"): string => {
            return char.repeat(width);
        };
    
        // Helper function to center-align text within a box
        const centerText = (text: string, width: number): string => {
            const space = Math.max(0, width - text.length);
            const padStart = Math.floor(space / 2);
            const padEnd = space - padStart;
            return " ".repeat(padStart) + text + " ".repeat(padEnd);
        };
    
        return {createLine, centerText};
    }

    showAllCustomerData() : void {
        if(Sales.allCustomers.length === 0) {
            console.log("----------------- no record found -----------------\n");
            return;
        }

        let {createLine, centerText} = this.designTheOutput();
        const boxWidth : number = 60; // Width of the box

        console.log(createLine(boxWidth, "="));
        console.log(centerText("Customer Details", boxWidth));

        Sales.allCustomers.forEach((currentCustomer, index) => {
            console.log(`Customer #${index + 1}`);
            console.log(createLine(boxWidth, "-"));
            console.log(`| Name         : ${currentCustomer.name.padEnd(boxWidth - 18)}|`);
            console.log(`| Email        : ${currentCustomer.email.padEnd(boxWidth - 18)}|`);
            console.log(`| Phone        : ${currentCustomer.phoneNumber.toString().padEnd(boxWidth - 18)}|`);
            console.log(`| Address      : ${currentCustomer.address.padEnd(boxWidth - 18)}|`);
            console.log(`| Total Orders : ${currentCustomer.allOrders.length.toString().padEnd(boxWidth - 18)}|`);
            console.log(createLine(boxWidth, "-"));
        })

        console.log(createLine(boxWidth, "="));
    }

    showCustomerOrderHistoryDetails(customer: Customer) : void {
        if(Sales.allCustomers.length === 0) {
            console.log("----------------- customer have no orders -----------------\n");
            return;
        }
    
        let {createLine, centerText} = this.designTheOutput();
        const boxWidth : number = 60; // Width of the box

        // Print customer details in a box
        console.log(createLine(boxWidth, "="));
        console.log(centerText("Customer Details", boxWidth));
        console.log(createLine(boxWidth, "="));

        console.log(`| Name         : ${customer.name.padEnd(boxWidth - 18)}|`);
        console.log(`| Email        : ${customer.email.padEnd(boxWidth - 18)}|`);
        console.log(`| Phone        : ${customer.phoneNumber.toString().padEnd(boxWidth - 18)}|`);
        console.log(`| Address      : ${customer.address.padEnd(boxWidth - 18)}|`);
        console.log(`| Total Orders : ${(customer.allOrders.length).toString().padEnd(boxWidth - 18)}|`);
        console.log(createLine(boxWidth, "="));
    
        customer.showOrderHistory();
    }
}