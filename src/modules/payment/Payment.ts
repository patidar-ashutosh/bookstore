import { v4 as uuidv4 } from 'uuid';
import { paymentTypes } from '../enums/paymentTypes';
import { Pay } from './pay';
import { layoutDesign } from '../../service/layoutDesign';

export class Payment {
    public status : boolean = false;
    public id : string = "";
    public paymemtType : paymentTypes = paymentTypes.COD;
    public paymentMethod : string = "";

    makePayment(paymemtType:string) : boolean {
        
        if(paymemtType === paymentTypes.COD) {
            this.paymemtType = paymentTypes.COD;
            this.paymentMethod = "Cash On Delivery";
            console.log("------------ you need to pay amount when you receive the order :) ------------\n");
            this.status = true;
            return true;
        } 

        console.log("------------ you need to pay amount using online :) ------------\n");
        console.log("------------ so please select payment method :) ------------\n");
            
        let selectedPaymentMethod : string = this.selectPaymentMethod();

        const pay = new Pay();

        if(selectedPaymentMethod === "payWithCard") {
            let cardNumber : number = 1234456312345678;
            let cvv : number = 455
            this.status = pay.payWithCard(cardNumber, cvv);
            this.paymentMethod = "Pay With Card";
            this.generatePaymentStatement("Your Card Number", cardNumber);
        } else if(selectedPaymentMethod === "payWithNetBanking") {
            let userId : string = "test@123";
            let password : string = "test@test";
            this.status = pay.payWithNetBanking("sbi", userId, password);
            this.paymentMethod = "Pay With Net Banking";
            this.generatePaymentStatement("Your Net Banking UserId", userId);
        } else if(selectedPaymentMethod === "payWithUpi") {
            let upiId : string = "test@ybl";
            this.status = pay.payWithUpi(upiId);
            this.paymentMethod = "Pay With Upi";
            this.generatePaymentStatement("Your UPI id", upiId);
        }

        return this.status;
    }

    private generatePaymentStatement(message:string, usedInfo:string|number) : void {
        let {createLine, centerText} = layoutDesign.designTheOutput();
        const boxWidth : number = 60; // Width of the box
        console.log(createLine(boxWidth, "="));

        console.log(centerText("Payment Statement", boxWidth));
        console.log(createLine(boxWidth, "-"));
        console.log(`| ${message} -> ${usedInfo}`.padEnd(boxWidth - 1) + "|");

        console.log(`| Payment status : ${this.status === true ? "Done" : "Failed"}`.padEnd(boxWidth - 1) + "|");
    
        this.id = uuidv4();
        console.log(`| Payment id : ${this.id}`.padEnd(boxWidth - 1) + "|");

        console.log(createLine(boxWidth, "="));
    }

    private selectPaymentMethod() : string {
        let {createLine, centerText} = layoutDesign.designTheOutput();
        const boxWidth : number = 60; // Width of the box

        console.log(createLine(boxWidth, "-"));
        console.log(centerText("We have 3 types of online paymet system", boxWidth));
        console.log(centerText("Pay With Net Banking", boxWidth));
        console.log(centerText("Pay With Card", boxWidth));
        console.log(centerText("Pay With Upi", boxWidth));
        console.log(createLine(boxWidth, "-"));

        // return "payWithCard";
        // return "payWithNetBanking";
        return "payWithUpi";
    }
}