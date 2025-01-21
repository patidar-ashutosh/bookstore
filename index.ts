import { Admin } from './src/modules/admin/Admin';
import { Customer } from './src/modules/customer/Customer';
import { v4 as uuidv4 } from 'uuid';
import { User } from './src/User';
import { Sales } from './src/modules/admin/Sales';
import { Book } from './src/modules/books/Book';
import { BookInventory } from './src/modules/books/BookInventory';

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

// BookInventoryObject.showAllBooks();

// BookInventory.books[1].editBook("a", "", 100, 2, "", "");

// BookInventoryObject.showAllBooks();

// BookInventoryObject.removeBook(BookInventory.books[1]);

// BookInventoryObject.showAllBooks();

// BookInventoryObject.searchBook("Noah");

// admin.analyzeSales();

let customer1 : Customer | null = new Customer("c1", "c1@gmail.com", "123", 123, "aa");
// let result = customer1.login("c1@gmail.com", "123");

customer1.buyNow(1, 2);

// customer1.cart.addToCart(1,1);
// customer1.cart.addToCart(2,3);
// customer1.cart.addToCart(3,6);

// customer1.cart.showAllCartItems();

// customer1.cart.removeItemFromCart(customer1.cart.allCartItems[1]);
// customer1.cart.removeItemFromCart(4);
// customer1.cart.showAllCartItems();

// customer1.purchaseBook(9, 5);
// customer1.purchaseBook(0, 3);

// customer1.showOrderHistory();
// customer1.cart.showAllCartItems();

// customer1.placeOrder();

// customer1.showOrderHistory();

// customer1.cart.addToCart(3,1, customer1);
// customer1.cart.addToCart(3,1, customer1);

// customer1.placeOrder();

// customer1.showOrderHistory();

// customer1.cart.showAllCartItems();

// const customer2 = new Customer("c2", "c2@gmail.com", "123", 123, "aa");

// customer2.buyNow(1, 2);
// customer2.buyNow(1, 2);

// customer2.cart.addToCart(4,9, customer2);
// customer2.cart.addToCart(5,1, customer2);

// customer2.cart.showAllCartItems();

// customer2.placeOrder();

// customer2.cart.addToCart(3,1, customer2);
// customer2.cart.addToCart(3,1, customer2);

// customer2.placeOrder();

// customer2.showOrderHistory();
// customer2.cart.showAllCartItems();

// Sales.analyzeSales();

// Sales.showCustomerOrderHistoryDetails(Sales.allCustomers[0]);

// User.allUsers.forEach((currentOne) => {
//     console.log(currentOne);
// })

// admin.test();
admin.showAllCustomerData();
admin.showCustomerOrderHistoryDetails();