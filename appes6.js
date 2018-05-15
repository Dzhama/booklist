//Book Constructor
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Constructor
class UI {

    // Add Book to List
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // Create tr element
        const row = document.createElement('tr');
        //Inset cols;
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    // Clear Fields 
    clearFields () {
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }

    //Show Alert
    showAlert (messase, className) {
        //Create a DIV
        const div = document.createElement('div');
        //add class name
        div.className = `alert ${className}`;
        // add text 
        div.appendChild(document.createTextNode(messase));
        // get parent 
        const container = document.querySelector(".container");
        // get form
        const form = document.querySelector("#book-form");
        //insert alert
        container.insertBefore(div, form);
        // setTimeout
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    //Detete Bokk
    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

// LS

class Store {

    //Get Books
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    // Display Books
    static displayBooks() {
        // get list of books
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            //add book to UI
            ui.addBookToList(book);
        });
    }
    // Add books
    static addBook(book) {
       // get list of books
        const books = Store.getBooks();
       // Push new book to the list
        books.push(book);
    
       localStorage.setItem('books', JSON.stringify(books));
    }
    // Delete Books
    static removeBook(isbn) {
        // get list of books
        const books = Store.getBooks();
       
        books.forEach(function(book, index){
          if(book.isbn === isbn) {
              books.splice(index, 1);
          }
        });
        
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM Load EVENT
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listeners for add Book
document.getElementById('book-form').addEventListener('submit', function(e){
    // get form values
    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;
    //Instantiate book
    const book = new Book (title, author, isbn);
    //Instantiate UI
    const ui = new UI();

    //Validate
    if(title === "" || author === "" || isbn === "") {
        ui.showAlert("Please fill in all fields", "error");
    }else {
        // Add book to list
        ui.addBookToList(book);
        // add book to LS
        Store.addBook(book);
        // show succcess
        ui.showAlert("Book Added!", "success");
        // UI Clear Field
        ui.clearFields();
    }
    e.preventDefault();
})

// Event Listeners for Delete
document.querySelector('#book-list').addEventListener('click', function(e) {
    // Instantiate UI
    const ui = new UI();   
    // Delete book
    ui.deleteBook(e.target);
    //delete book from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Show Alert message
    ui.showAlert('Book Removed!', 'success');
    e.preventDefault();
});