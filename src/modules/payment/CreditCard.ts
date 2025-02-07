import { layoutDesign } from "../../service/layoutDesign";
import { PaymentStructure } from "./PaymentStructure";


export class CreditCard implements PaymentStructure {
  constructor(
    private cardNumber: number,
    private cardHolderName: string,
    private expiryDate: string,
    private cvv: number
  ) {}

  private paymentStatus: boolean = false;

  public pay(): boolean {
    let { createLine, centerText } = layoutDesign.designTheOutput();
    const boxWidth: number = 60; // Width of the box

    console.log(createLine(boxWidth, "="));
    console.log(centerText("Processing Payment...", boxWidth));
    console.log(createLine(boxWidth, "="));

    const exampleCardNumber: number = 123456789; // Example valid card number
    const exampleCardHolderName: string = "Mark";
    const exampleExpiryDate: string = "12/25";
    const exampleCvv: number = 123;

    if (
      this.getCardNumber() === exampleCardNumber &&
      this.getCardHolderName() === exampleCardHolderName &&
      this.getExpiryDate() === exampleExpiryDate &&
      this.getCvv() === exampleCvv
    ) {
      this.paymentStatus = true;
      console.log(centerText("Payment Successful!", boxWidth));
    } else {
      this.paymentStatus = false;
      console.log(
        centerText("Payment Failed! Invalid card details.", boxWidth)
      );
    }

    console.log(createLine(boxWidth, "="));
    return this.paymentStatus;
  }

  private getCardHolderName(): string {
    return this.cardHolderName;
  }

  private getCardNumber(): number {
    return this.cardNumber;
  }

  private getExpiryDate(): string {
    return this.expiryDate;
  }

  private getCvv(): number {
    return this.cvv;
  }
}
