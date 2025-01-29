import { v4 as uuidv4 } from "uuid";
import { PaymentStructure,PaymentReceipt } from "./PaymentStructure";

export class Payment {
  public static verify(paymentModule: PaymentStructure): PaymentReceipt | string {
    if (paymentModule.pay()) {
      return Payment.getReceipt(paymentModule);
    } else {
      return "payment failed!";
    }
  }

  private static getReceipt(paymentModule: PaymentStructure): PaymentReceipt {
    const paymentReceipt: PaymentReceipt = {
      paymentId: uuidv4(),
      paymentMethod: paymentModule,
    } as PaymentReceipt;
    return paymentReceipt;
  }
}
