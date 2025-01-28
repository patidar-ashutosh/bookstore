import { Sales } from "../admin/Sales";
import { User } from "../../User";
import { Payment, PaymentReceiptSchema } from "../payment/Payment";
import { Cart } from "../cart/Cart";
import { typeOfAddress } from "../enums/typeOfAddress";
import { Address } from "./Address";
import { layoutDesign } from "../../service/layoutDesign";
import { DigitalOrder } from "../order/DigitalOrder";
import { PhysicalOrder } from "../order/PhysicalOrder";
import { CreditCard } from "../payment/PaymentMethods/CreditCard";
import { isQuantityAvailableForCartItems } from "../cart/isQuantityAvailableForCartItems";
import { CartItem } from "../cart/CartItem";
import { getListOfDigitallyNotAvailableBooks } from "../books/getListOfDigitallyNotAvailableBooks";
import { Upi } from "../payment/PaymentMethods/Upi";
import { Order } from "../order/Order";
import { createOrder } from "../order/createOrder";
import { create } from "domain";

export class Customer extends User {
  public orders: (DigitalOrder | PhysicalOrder)[];
  public addresses: Address[];

  constructor(
    name: string,
    email: string,
    password: string,
    readonly phoneNumber: number
  ) {
    super(name, email, password);
    this.phoneNumber = phoneNumber;
    this.orders = [];
    this.addresses = [];
  }

  private cart: Cart = new Cart();

  public getCart(): Cart {
    return this.cart;
  }

  public placeOrderPhysically(): void {
    if (!this.getCart().isItemsAvailable()) {
      console.log(
        "------------ you have no item in cart yet :) ------------\n"
      );
      return;
    }

    if (!isQuantityAvailableForCartItems(this)) {
      return;
    }

    let shippingAddress: Address = this.selectAddress();
    const payment: Payment = new Payment();

    //customer selected to pay with credit card
    let paymentReceipt: PaymentReceiptSchema | string = payment.verify(
      new CreditCard(123456789, "Mark", "12/25", 123)
    );

    if (typeof paymentReceipt == "string") {
      console.log(
        "~~~~~~~~~~ order not place because payment failed :) ~~~~~~~~~~"
      );
      return;
    }

    const order: PhysicalOrder = this.createOrder<PhysicalOrder>(
      this,
      paymentReceipt,
      "Physical Order",
      shippingAddress
    );

    this.orders.push(order);

    const newSales: Sales = new Sales();
    newSales.storeOrder(this);
    this.getCart().empty();

    console.log("\n~~~~~~~~~~ order place successfully :) ~~~~~~~~~~ \n");
  }

  public placeOrderDigitally(): void {
    const digitallyNotAvailableItems: CartItem[] | true =
      getListOfDigitallyNotAvailableBooks(this.cart);

    if (digitallyNotAvailableItems != true) {
      console.log(
        `Some items in your cart is currently not available in digital Format: ${digitallyNotAvailableItems}`
      );
      return;
    }

    const payment: Payment = new Payment();
    const paymentReceipt: PaymentReceiptSchema | string = payment.verify(
      new Upi("example@gmail.com")
    );

    if (typeof paymentReceipt == "string") {
      console.log(
        "~~~~~~~~~~ order not place because payment failed :) ~~~~~~~~~~"
      );
      return;
    }

    const order: DigitalOrder = this.createOrder<DigitalOrder>(
      this,
      paymentReceipt,
      "Digital Order"
    );
    this.orders.push(order);
    const newSales: Sales = new Sales();
    newSales.storeOrder(this);
    this.getCart().empty();

    console.log(
      "------------------ Order has been placed successfully! ------------------------"
    );
  }

  public addAddress(newAddress: Address): void {
    this.addresses.push(newAddress);
  }

  public showOrderHistory(): void {
    let { createLine, centerText } = layoutDesign.designTheOutput();
    const boxWidth: number = 60; // Width of the box

    console.log(createLine(boxWidth, "="));
    console.log(centerText("Order History", boxWidth));

    if (this.orders.length === 0) {
      console.log(centerText("you have no orders yet :)", boxWidth));
      console.log(createLine(boxWidth, "="));
      console.log("\n");
      return;
    }

    this.orders.forEach((currentOrder, index) => {
      console.log(createLine(boxWidth, "-"));
      console.log(`| Order #${index + 1}`.padEnd(boxWidth - 1) + "|");
      console.log(createLine(boxWidth, "-"));

      // print one by one order details
      currentOrder.printDetails();
    });

    console.log(createLine(boxWidth, "="));
  }

  public showAddresses(): void {
    let { createLine, centerText } = layoutDesign.designTheOutput();
    const boxWidth: number = 60; // Width of the box

    console.log(createLine(boxWidth, "-"));
    console.log(centerText("All Address", boxWidth));
    console.log(createLine(boxWidth, "-"));

    this.addresses.forEach((currentAddress, index) => {
      console.log(centerText(`Address #${index + 1}`, boxWidth));
      currentAddress.printDetails();
      console.log(createLine(boxWidth, "-"));
    });
  }

  public selectAddress(): Address {
    let { createLine, centerText } = layoutDesign.designTheOutput();
    const boxWidth: number = 60; // Width of the box

    console.log("\n");
    console.log(createLine(boxWidth, "="));
    console.log(
      centerText(`~~~~~ Select your shipping address :) ~~~~~`, boxWidth)
    );

    let shippingAddress: Address;
    let isCustomerAddNewAddress: boolean = true;

    if (this.addresses.length !== 0) {
      this.showAddresses();
      console.log(
        centerText(`~~~~~ You want to add new address ??? ~~~~~`, boxWidth)
      );
      isCustomerAddNewAddress = true;
    }

    if (isCustomerAddNewAddress) {
      console.log(
        centerText(`~~~~~ Enter details of new address ~~~~~`, boxWidth)
      );
      this.addAddress(new Address("3", "3", 3, "3", "3", typeOfAddress.HOME));
      shippingAddress = this.addresses[this.addresses.length - 1];
    } else {
      shippingAddress = this.addresses[0];
    }

    console.log(createLine(boxWidth, "-"));
    console.log(centerText(`Address selected successfully :)`, boxWidth));
    console.log(createLine(boxWidth, "-"));

    console.log(createLine(boxWidth, "="));
    console.log("\n");

    return shippingAddress;
  }

  private createOrder<TypeOfOrder>(
    customer: Customer,
    paymentDetail: PaymentReceiptSchema,
    orderType: string,
    shippingAddress?: Address
  ): TypeOfOrder {
    let totalPriceOfOrder: number = 0;
    let products: CartItem[] = [];

    customer
      .getCart()
      .getItems()
      .forEach((currentItem: CartItem) => {
        totalPriceOfOrder += currentItem.getTotalPrice();
        products.push(currentItem);
      });

    if (shippingAddress) {
      this.quantityDecreaser(customer.getCart());
      return new PhysicalOrder(
        products,
        totalPriceOfOrder,
        paymentDetail,
        orderType,
        shippingAddress
      ) as TypeOfOrder;
    }

    return new DigitalOrder(
      products,
      totalPriceOfOrder,
      paymentDetail,
      orderType
    ) as TypeOfOrder;
  }
  private quantityDecreaser(cart: Cart) {
    cart.getItems().forEach((currentCartItem: CartItem) => {
      currentCartItem
        .getItem()
        .setQuantity(
          currentCartItem.getItem().getQuantity() -
            currentCartItem.getItemQuantity()
        );
    });
  }
}
