class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        this.displayBooks();
    }

    removeBook(index) {
        this.books.splice(index, 1);
        this.displayBooks();
    }

    toggleReadStatus(index) {
        this.books[index].toggleRead();
        this.displayBooks();
    }

    displayBooks() {
        const container = document.querySelector(".container");
        container.innerHTML = '';

        this.books.forEach((book, index) => {
            //create book container
            const bookCard = document.createElement("div");
            bookCard.className = "book";
            bookCard.setAttribute("data-index", index);
    
            //create title
            const titleElement = document.createElement("h3");
            titleElement.className = "title";
            titleElement.textContent = book.title;
    
            //create author
            const authorElement = document.createElement("p");
            authorElement.className = "author";
            authorElement.textContent = `by ${book.author}`;
    
            //create pages
            const pageElement = document.createElement("p");
            pageElement.className = "page";
            pageElement.textContent = `${book.pages} pages`;
    
            //create read status
            const readElement = document.createElement("p");
            readElement.className = (book.read ? "read" : "unread");
            readElement.textContent = (book.read ? "Read" : "Not read");
    
            //create button container
            const bookbtns = document.createElement("div");
            bookbtns.className = "bookbtns";
    
            //create buttons
            const toggleReadbtn = document.createElement("button");
            toggleReadbtn.className = "toggle-readbtn";
            toggleReadbtn.textContent = "Toggle Read";
            toggleReadbtn.addEventListener("click", () => this.toggleReadStatus(index));
    
            const delbtn = document.createElement("button");
            delbtn.className = "deletebtn";
            delbtn.textContent = "Delete";
            delbtn.addEventListener("click", () => this.removeBook(index));
    
            bookbtns.appendChild(toggleReadbtn);
            bookbtns.appendChild(delbtn);
    
            //append all create elements to card then container
            bookCard.appendChild(titleElement);
            bookCard.appendChild(authorElement);
            bookCard.appendChild(pageElement);
            bookCard.appendChild(readElement);
            bookCard.appendChild(bookbtns);
    
            container.appendChild(bookCard);
        });
    
    }


}

//initialize library
const myLibrary = new Library();

//modal handling
const newBookBtn = document.querySelector("#newBookBtn");
const bookModal = document.querySelector("#bookDialog");
const closeModal = document.querySelector("#closeModal");

closeModal.addEventListener("click", () => {
    bookModal.close();
});
newBookBtn.addEventListener("click", () => {
    bookModal.showModal();
});

const newBookForm = document.querySelector("#newBookForm");

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    const newBook = new Book(title,author,pages,read);
    myLibrary.addBook(newBook);
    newBookForm.reset();
    bookModal.close();
});

myLibrary.addBook(new Book("Berserk Vol.1", "Kento Miura", 224, true));
myLibrary.addBook(new Book("Nana Vol.1", "Ai Yazawa", 192, false));