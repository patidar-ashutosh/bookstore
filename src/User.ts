import { Admin } from "./modules/admin/Admin";
import { Customer } from "./modules/customer/Customer";

export class User {
    public static users : (Admin | Customer)[] = [];

    constructor(readonly name:string, readonly email:string, readonly password:string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    login(email:string, password:string) : Admin | Customer | boolean {
        if(this.email === email && this.password === password) {
            return true;
        } else if(this.email === email && this.password === password) {
            return true;
        } else {
            return false;
        }
    }

    logout() : void {
        console.log("Logout successfully :)");
    }
}