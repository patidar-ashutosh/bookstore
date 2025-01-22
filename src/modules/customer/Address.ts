import { designTheOutput } from "../../utilities/designTheOutput";
import { typeOfAddress } from "../enums/typeOfAddress";

export class Address {
    constructor(readonly houseNoAndBulindingName:string, readonly area:string, readonly pinCode:number, readonly city:string, readonly state:string, readonly typeOfAddress:typeOfAddress) {}

    printDetails() : void {
        let {createLine, centerText} = designTheOutput();
        const boxWidth : number = 60; // Width of the box

        console.log(`| House Number & Bulinding      : ${this.houseNoAndBulindingName}`);
        console.log(`| Area                          : ${this.area}`);
        console.log(`| Pin code                      : ${this.pinCode.toString()}`);
        console.log(`| City                          : ${this.city}`);
        console.log(`| State                         : ${this.state}`);
        console.log(`| Type of address               : ${this.typeOfAddress}`);
    }
}