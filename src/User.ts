import { Admin } from "./modules/admin/Admin";
import { Customer } from "./modules/customer/Customer";

export class User {

    public static allUsers : (Admin | Customer)[] = [];

    constructor(public name:string, public email:string, public password:string) {
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

    logout() {
        console.log("Logout successfully :)");
    }
}