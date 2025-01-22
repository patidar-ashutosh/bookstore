import { typeOfAddress } from "../enums/typeOfAddress";

export class Address {

    public address : {};

    constructor(houseNoAndBulindingName:string, area:string, pinCode:number, city:string, state:string, typeOfAddress:typeOfAddress) {
        this.address = {
            houseNoAndBulindingName,
            area,
            pinCode,
            city,
            state,
            typeOfAddress
        };
    }


}