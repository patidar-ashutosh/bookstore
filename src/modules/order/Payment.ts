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

    private payWithNetBanking(bankName : string, userId : string, passWord : string) : void {
        const correctUserName : string = "test@123";
        const correctPassword : string = "test@test";

        if (userId === correctUserName && passWord === correctPassword) {
            console.log(`You Pay With ${bankName} Bank`);
            console.log("You have Successfully paid with NetBanking...");
            this.status = true;
        }else{
            console.log('Your Payments Has Failed...try Again...');
            this.status = false;
        }
    }

    private payWithCard(cardNumber : number, cvv : number) : void {
        const correctCardNumber : number = 1234456312345678;
        const correctCvv : number = 455;

        if (cardNumber === correctCardNumber && cvv === correctCvv ) {
            console.log('You Pay With Card : ');
            console.log('You have Successfully Paid With Card...');
            this.status = true;
        }else {
            console.log('Your Payments Has Failed...try Again...');
            this.status = false;
        }
    }

    private payWithUpi(upiId : string) : void {
        const correctUpi : string = "test@ybl";

        if (upiId === correctUpi) {
            console.log('You Pay With An Upi : ');
            console.log('Gathering payment request In Your UpiApp...');
            console.log('Processing your payment...');
            console.log('You have Successfully Paid With Upi...');
            this.status = true;
        }else{
            console.log('Your Payments Has Failed...try Again...');
            this.status = false;
        }
    }
}