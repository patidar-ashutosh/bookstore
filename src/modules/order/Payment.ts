import { v4 as uuidv4 } from 'uuid';
import { orderTypes } from '../enums/orderTypes';
import { paymentTypes } from '../enums/enumPaymentTypes';
import { designTheOutput } from '../../utilities/designTheOutput';

export class Payment {
    public status : boolean = false;
    public id : string = "";
    public type : paymentTypes = paymentTypes.COD;

    makePayment(orderType:string) : boolean {
        
        if(orderType === orderTypes.DIGITAL) {
            this.type = paymentTypes.Online;
            console.log("------------ you need to pay amount using online :) ------------\n");
            this.payWithOnline();
        } else if(orderType === orderTypes.PHYSICAL) {

            this.type = paymentTypes.Online;
            
            if(this.type.includes(paymentTypes.COD)) {
                console.log("------------ you need to pay amount when you receive the order :) ------------\n");
                this.status = true;
            } else if(this.type.includes(paymentTypes.Online)) {
                console.log("------------ you need to pay amount using online :) ------------\n");
                this.payWithOnline();
            }
        }

        return this.status;
    }

    private payWithOnline() : void {
        let {createLine, centerText} = designTheOutput();
        const boxWidth : number = 60; // Width of the box
        console.log(createLine(boxWidth, "="));

        console.log(centerText("Payment Statement", boxWidth));
        console.log(createLine(boxWidth, "-"));
        console.log(`| your upi is -> example@ybl`.padEnd(boxWidth - 1) + "|");

        this.status = true;
        console.log(`| Payment status : ${this.status === true ? "Done" : "Failed"}`.padEnd(boxWidth - 1) + "|");
    
        this.id = uuidv4();
        console.log(`| Payment id : ${this.id}`.padEnd(boxWidth - 1) + "|");

        console.log(createLine(boxWidth, "="));
    }
}