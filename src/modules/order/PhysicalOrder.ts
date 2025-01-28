import { layoutDesign } from "../../service/layoutDesign";
import { CartItem } from "../cart/CartItem";
import { Address } from "../customer/Address";
import { Customer } from "../customer/Customer";
import { PaymentReceiptSchema } from "../payment/Payment";
import { Order } from "./Order";

export class PhysicalOrder extends Order {
  constructor(
    public products: CartItem[],
    public totalPriceOfOrder: number,
    public paymentDetail: PaymentReceiptSchema,
    public orderType: string,
    public shippingAddress: Address
  ) {
    super(products, totalPriceOfOrder, paymentDetail,orderType);
  }

  printDetails(): void {
    super.printDetails();
    let { createLine, centerText } = layoutDesign.designTheOutput();
    const boxWidth: number = 60; // Width of the box
    console.log(centerText("Shipping Address", boxWidth));
    console.log(createLine(boxWidth, "-"));
    this.shippingAddress.printDetails();
  }
}
