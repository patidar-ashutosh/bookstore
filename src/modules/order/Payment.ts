import { v4 as uuidv4 } from 'uuid';

export class Payments {

    public status : boolean;
    public paymentId : string = uuidv4();

    constructor(public paymentType : string) {
        this.status = false;
        this.paymentType = paymentType;
    }

    paymentNow() : boolean{
        this.status = true;
        return this.status;
    }
}