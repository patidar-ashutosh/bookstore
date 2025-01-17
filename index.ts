import { Admin } from './src/modules/admin/Admin';
import { Customer } from './src/modules/customer/Customer';
import { v4 as uuidv4 } from 'uuid';
import { User } from './src/User';

const admin = new Admin("rock", "admin@gmail.com", "admin");
admin.login("admin@gmail.com", "admin");

const firstBookId = uuidv4();

admin.BookInventoryObject.addBook(firstBookId, "The Great Gatsby", "F. Scott Fitzgerald", 399, 10, "Fiction", "Scribner");
admin.BookInventoryObject.addBook(uuidv4(), "1984", "George Orwell", 499, 10, "Dystopian", "Secker & Warburg");
admin.BookInventoryObject.addBook(uuidv4(), "To Kill a Mockingbird", "Harper Lee", 349, 10, "Classic", "J.B. Lippincott & Co.");
admin.BookInventoryObject.addBook(uuidv4(), "The Catcher in the Rye", "J.D. Salinger", 299, 10, "Young Adult", "Little, Brown and Company");
admin.BookInventoryObject.addBook(uuidv4(), "Pride and Prejudice", "Jane Austen", 249, 10, "Romance", "T. Egerton");
admin.BookInventoryObject.addBook(uuidv4(), "The Hobbit", "J.R.R. Tolkien", 599, 10, "Fantasy", "George Allen & Unwin");
admin.BookInventoryObject.addBook(uuidv4(), "Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 799, 10, "Fantasy", "Bloomsbury");
admin.BookInventoryObject.addBook(uuidv4(), "The Alchemist", "Paulo Coelho", 399, 10, "Philosophy", "HarperOne");
admin.BookInventoryObject.addBook(uuidv4(), "The Da Vinci Code", "Dan Brown", 450, 10, "Thriller", "Doubleday");
admin.BookInventoryObject.addBook(uuidv4(), "Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 699, 10, "Non-Fiction", "Harvill Secker");

// admin.BookInventoryObject.getAllBooks();

// admin.BookInventoryObject.editBook(1, "a", "", 100, 2, "", "");

// admin.BookInventoryObject.removeBook(firstBookId);

// admin.BookInventoryObject.searchBook("Noah");

// admin.analyzeSales();

let customer1 : Customer | null = new Customer("c1", "c1@gmail.com", "123", 123, "aa");
// let result = customer1.login("c1@gmail.com", "123");

customer1.cart.addToCart(1,1, customer1);
customer1.cart.addToCart(2,3, customer1);
customer1.cart.addToCart(3,6, customer1);

// customer1.cart.getAllCartItems();

// customer1.cart.removeItemFromCart(2);
// customer1.cart.removeItemFromCart(4);
// customer1.cart.getAllCartItems();

// customer1.purchaseBook(9, 5);
// customer1.purchaseBook(0, 3);

// customer1.getOrderHistory();
// customer1.cart.getAllCartItems();

customer1.placeOrder();

customer1.getOrderHistory();
customer1.cart.getAllCartItems();

const customer2 = new Customer("c2", "c2@gmail.com", "123", 123, "aa");

customer2.cart.addToCart(4,9, customer2);
customer2.cart.addToCart(5,1, customer2);

customer2.cart.getAllCartItems();

customer2.placeOrder();

customer2.getOrderHistory();
customer2.cart.getAllCartItems();

admin.analyzeSales();

// User.allUsers.forEach((currentOne) => {
//     console.log(currentOne);
// })