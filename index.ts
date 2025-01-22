import { Admin } from './src/modules/admin/Admin';
import { Customer } from './src/modules/customer/Customer';
import { v4 as uuidv4 } from 'uuid';
import { User } from './src/User';
import { Sales } from './src/modules/admin/Sales';
import { Book } from './src/modules/books/Book';
import { BookInventory } from './src/modules/books/BookInventory';
import { Address } from './src/modules/customer/Address';
import { typeOfAddress } from './src/modules/enums/typeOfAddress';
import { orderTypes } from './src/modules/enums/orderTypes';

const admin = new Admin("rock", "admin@gmail.com", "admin");
admin.login("admin@gmail.com", "admin");

const firstBookId = uuidv4();

const BookInventoryObject = new BookInventory();

BookInventoryObject.addBook(new Book(firstBookId, "The Great Gatsby", "F. Scott Fitzgerald", 399, 10, "Fiction", "Scribner"));
BookInventoryObject.addBook(new Book(uuidv4(), "1984", "George Orwell", 499, 10, "Dystopian", "Secker & Warburg"));
BookInventoryObject.addBook(new Book(uuidv4(), "To Kill a Mockingbird", "Harper Lee", 349, 10, "Classic", "J.B. Lippincott & Co."));
BookInventoryObject.addBook(new Book(uuidv4(), "The Catcher in the Rye", "J.D. Salinger", 299, 10, "Young Adult", "Little, Brown and Company"));
BookInventoryObject.addBook(new Book(uuidv4(), "Pride and Prejudice", "Jane Austen", 249, 10, "Romance", "T. Egerton"));
BookInventoryObject.addBook(new Book(uuidv4(), "The Hobbit", "J.R.R. Tolkien", 599, 10, "Fantasy", "George Allen & Unwin"));
BookInventoryObject.addBook(new Book(uuidv4(), "Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 799, 10, "Fantasy", "Bloomsbury"));
BookInventoryObject.addBook(new Book(uuidv4(), "The Alchemist", "Paulo Coelho", 399, 10, "Philosophy", "HarperOne"));
BookInventoryObject.addBook(new Book(uuidv4(), "The Da Vinci Code", "Dan Brown", 450, 10, "Thriller", "Doubleday"));
BookInventoryObject.addBook(new Book(uuidv4(), "Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 699, 10, "Non-Fiction", "Harvill Secker"));

// BookInventoryObject.showBooks();

// BookInventory.books[1].editBook("a", "", 100, 2, "", "");

// BookInventoryObject.showBooks();

// BookInventoryObject.removeBook(BookInventory.books[1]);

// BookInventoryObject.showBooks();

// BookInventoryObject.searchBook("Noah");

// admin.analyzeSales();

let customer1 : Customer | null = new Customer("c1", "c1@gmail.com", "123", 123);
// let result = customer1.login("c1@gmail.com", "123");

customer1.addAddress(new Address("1", "1", 1, "1", "1", typeOfAddress.HOME));
// customer1.addAddress(new Address("2", "2", 2, "2", "2", typeOfAddress.HOME));

// customer1.buyNow(1, 2);

// customer1.cart.removeItem(customer1.cart.items[1]);
// customer1.cart.removeItem(4);
// customer1.cart.showItems();

// customer1.purchaseBook(9, 5);
// customer1.purchaseBook(0, 3);

// customer1.showOrderHistory();
// customer1.cart.showItems();


// customer1.showOrderHistory();

// customer1.cart.addItem(3,1, customer1);
// customer1.cart.addItem(3,1, customer1);

// customer1.placeOrder();

// customer1.showOrderHistory();

customer1.cart.addItem(1,1);
customer1.cart.addItem(2,3);
customer1.cart.addItem(3,6);

// customer1.cart.showItems();

customer1.placeOrder(orderTypes.PHYSICAL);

customer1.showOrderHistory();

// customer1.cart.showItems();

// admin.test();
// admin.showCustomersData();
// admin.showCustomerOrderHistoryDetails();

// customer1.showAddresses();