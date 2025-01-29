import { PaymentStructure } from "./PaymentStructure";

export class CashOnDelivery implements PaymentStructure {
  private paymentStatus: boolean = false;

  public pay(): boolean {
    console.log("------------ you need to pay amount when you receive the order :) ------------\n");

    return true;
  }

  private setPaymentStatus(status: boolean): void {
    this.paymentStatus = status;
  }
}
