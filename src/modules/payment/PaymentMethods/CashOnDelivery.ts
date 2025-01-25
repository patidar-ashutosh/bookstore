import { Payment } from "../Payment";
import { BasePayment } from "./BasePayment";

export class CashOnDelivery extends BasePayment {
  private paymentStatus: boolean = false;

  public pay(): boolean {
    console.log(
      "------------ you need to pay amount when you receive the order :) ------------\n"
    );

    return true;
  }

  private setPaymentStatus(status: boolean): void {
    this.paymentStatus = status;
  }
}