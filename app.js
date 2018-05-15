
//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;//Book Constructor
    this.isbn = isbn;
}

//UI Constructor
function UI () {}
// add book to list
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');

    //inset cols;
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

// Clear Fields
UI.prototype.clearFields = function() {
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#isbn').value = "";
}

//Show Alert
UI.prototype.showAlert = function(messase, className) {
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

//Detete Book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}
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

    // Show Alert message
    ui.showAlert('Book Removed!', 'success');
    
    e.preventDefault();
});