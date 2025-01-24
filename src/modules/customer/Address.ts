import { typeOfAddress } from "../enums/typeOfAddress";

export class Address {
    constructor(readonly houseNoAndBuildingName:string, readonly area:string, readonly pinCode:number, readonly city:string, readonly state:string, readonly typeOfAddress:typeOfAddress) {}

    printDetails() : void {
        console.log(`| House Number & Building      : ${this.houseNoAndBuildingName}`);
        console.log(`| Area                          : ${this.area}`);
        console.log(`| Pin code                      : ${this.pinCode.toString()}`);
        console.log(`| City                          : ${this.city}`);
        console.log(`| State                         : ${this.state}`);
        console.log(`| Type of address               : ${this.typeOfAddress}`);
    }
}