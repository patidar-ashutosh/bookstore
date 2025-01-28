import { Admin } from './src/modules/admin/Admin';
import { v4 as uuidv4 } from 'uuid';
import { Book } from './src/modules/books/Book';
import { BookInventory } from './src/modules/books/BookInventory';
import { Customer } from './src/modules/customer/Customer';
import { Address } from './src/modules/customer/Address';
import { typeOfAddress } from './src/modules/enums/typeOfAddress';

const allUsers = [];

const admin = new Admin("rock", "admin@gmail.com", "admin");
allUsers.push(admin);
admin.login("admin@gmail.com", "admin");

const firstBookId = uuidv4();

const bookInventory = new BookInventory();

bookInventory.addBook(new Book(firstBookId, "The Great Gatsby", "F. Scott Fitzgerald", 399, 10, "Fiction", "Scribner", true));
bookInventory.addBook(new Book(uuidv4(), "1984", "George Orwell", 499, 10, "Dystopian", "Secker & Warburg", true));
bookInventory.addBook(new Book(uuidv4(), "To Kill a Mockingbird", "Harper Lee", 349, 10, "Classic", "J.B. Lippincott & Co.", true));
bookInventory.addBook(new Book(uuidv4(), "The Catcher in the Rye", "J.D. Salinger", 299, 10, "Young Adult", "Little, Brown and Company", true));
bookInventory.addBook(new Book(uuidv4(), "Pride and Prejudice", "Jane Austen", 249, 10, "Romance", "T. Egerton", true));
bookInventory.addBook(new Book(uuidv4(), "The Hobbit", "J.R.R. Tolkien", 599, 10, "Fantasy", "George Allen & Unwin", true));
bookInventory.addBook(new Book(uuidv4(), "Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 799, 10, "Fantasy", "Bloomsbury", true));
bookInventory.addBook(new Book(uuidv4(), "The Alchemist", "Paulo Coelho", 399, 10, "Philosophy", "HarperOne", true));
bookInventory.addBook(new Book(uuidv4(), "The Da Vinci Code", "Dan Brown", 450, 10, "Thriller", "Doubleday", true));
bookInventory.addBook(new Book(uuidv4(), "Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 699, 10, "Non-Fiction", "Harvill Secker", true));

// bookInventory.showBooks();

// BookInventory.books[1].editBook("a", "", 100, 2, "", "");

// bookInventory.removeBook(BookInventory.books[1]);

// bookInventory.searchBook("Fiction");

BookInventory.books[3].setIsDigitallyAvailable(false);
// bookInventory.showBooks();

let customer1 : Customer | null = new Customer("c1", "c1@gmail.com", "123", 123);
// let customer2 : Customer | null = new Customer("c1", "c1@gmail.com", "123", 123);


allUsers.push(customer1);
// allUsers.push(customer2);

customer1.addAddress(new Address("1", "1", 1, "1", "1", typeOfAddress.HOME));
// customer1.addAddress(new Address("1", "1", 1, "1", "1", typeOfAddress.HOME));
// customer1.showAddresses();

customer1.getCart().addItem(2, 6);
customer1.getCart().showItems();

customer1.placeOrderDigitally();
// customer1.placeOrderDigitally(1);
// customer1.showOrderHistory();

customer1.getCart().addItem(2, 5);

customer1.placeOrderPhysically();

// customer1.getCart().removeItem(customer1.getCart().getItems()[0]);

// customer2.placeOrderPhysically();

customer1.showOrderHistory();
// customer2.showOrderHistory();

// customer1.placeOrderDigitally(1);

admin.showCustomersInfo();
admin.showCustomerOrderHistory();