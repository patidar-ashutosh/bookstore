import { BasePayment } from "./BasePayment";

export class Upi extends BasePayment {
  constructor(private upiId: string) {
    super();
  }

  public pay(): boolean {
    const exampleUpiId = "example@gmail.com";

    if (this.getUpiId() != exampleUpiId) {
      return false;
    }
    return true;
  }

  private getUpiId(): string {
    return this.upiId;
  }
}