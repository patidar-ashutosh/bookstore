import { PaymentStructure } from "./PaymentStructure";

export class Upi implements PaymentStructure {
  constructor(private upiId: string) {}

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
