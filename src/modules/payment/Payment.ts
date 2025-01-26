import { v4 as uuidv4 } from 'uuid';
import { layoutDesign } from '../../service/layoutDesign';
import { BasePayment } from './PaymentMethods/BasePayment';


export interface PaymentReceiptSchema{
    paymentId:string;
    paymentMethod:BasePayment
}

export class Payment {

    public verify(basePayment:BasePayment) : PaymentReceiptSchema | string {
        if(basePayment.pay()){
            return this.getReceipt(basePayment);
        }else{
            return "payment failed!";
        }
    }

    private getReceipt(basePayment:BasePayment):PaymentReceiptSchema{
       const paymentReceipt:PaymentReceiptSchema = {"paymentId":uuidv4(),"paymentMethod":basePayment}
       return paymentReceipt;
    }

    // private generatePaymentStatement(message:string, usedInfo:string|number) : void {
    //     let {createLine, centerText} = layoutDesign.designTheOutput();
    //     const boxWidth : number = 60; // Width of the box
    //     console.log(createLine(boxWidth, "="));

    //     console.log(centerText("Payment Statement", boxWidth));
    //     console.log(createLine(boxWidth, "-"));
    //     console.log(`| ${message} -> ${usedInfo}`.padEnd(boxWidth - 1) + "|");

    //     console.log(`| Payment status : ${this.status === true ? "Done" : "Failed"}`.padEnd(boxWidth - 1) + "|");
    
    //     this.id = uuidv4();
    //     console.log(`| Payment id : ${this.id}`.padEnd(boxWidth - 1) + "|");

    //     console.log(createLine(boxWidth, "="));
    // }

    // private selectPaymentMethod() : string {
    //     let {createLine, centerText} = layoutDesign.designTheOutput();
    //     const boxWidth : number = 60; // Width of the box

    //     console.log(createLine(boxWidth, "-"));
    //     console.log(centerText("We have 3 types of online payment system", boxWidth));
    //     console.log(centerText("Pay With Net Banking", boxWidth));
    //     console.log(centerText("Pay With Card", boxWidth));
    //     console.log(centerText("Pay With Upi", boxWidth));
    //     console.log(createLine(boxWidth, "-"));

    //     // return "payWithCard";
    //     // return "payWithNetBanking";
    //     return "payWithUpi";
    // }
}
