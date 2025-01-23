export class User {

    constructor(readonly name:string, readonly email:string, readonly password:string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    login(email:string, password:string) : boolean {
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