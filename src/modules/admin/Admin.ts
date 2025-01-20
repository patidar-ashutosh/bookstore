import { User } from "../../User";
import { BookInventory } from "../books/BookInventory";
import { Sales } from "./Sales";

export class Admin extends User{

    constructor(name:string, email:string, password:string) {
        super(name, email, password);
        User.allUsers.push(this);
    }

    public BookInventoryObject = new BookInventory();
}