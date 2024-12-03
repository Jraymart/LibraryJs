const myLibrary = [];
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const container = document.querySelector(".container");
    container.innerHTML = '';

    myLibrary.forEach((book, index) => {
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
        readElement.classList = (book.read ? "read" : "unread");
        readElement.textContent = (book.read ? "Read" : "Not read");

        //create button container
        const bookbtns = document.createElement("div");
        bookbtns.className = "bookbtns";

        //create buttons
        const toggleReadbtn = document.createElement("button");
        toggleReadbtn.className = "toggle-readbtn";
        toggleReadbtn.textContent = "Toggle Read";
        toggleReadbtn.addEventListener("click", () => toggleReadStatus(index));

        const delbtn = document.createElement("button");
        delbtn.className = "deletebtn";
        delbtn.textContent = "Delete";
        delbtn.addEventListener("click", () => removeBook(index));

        bookbtns.appendChild(toggleReadbtn);
        bookbtns.appendChild(delbtn);

        //append all create elements to card then container
        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(pageElement);
        bookCard.appendChild(readElement);
        bookCard.appendChild(bookbtns);

        container.appendChild(bookCard);
    })

    Book.prototype.toggleRead = function () {
        this.read = !this.read;
    }
    function toggleReadStatus(index) {
        myLibrary[index].toggleRead();
        displayBooks();
    }
    function removeBook(index) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

//modal handling
const newBookBtn = document.querySelector("#newBookBtn");
const bookModal = document.querySelector("#bookDialog");
const closeModal = document.querySelector("#closeModal");

closeModal.addEventListener("click",()=>{
    bookModal.close();
});
newBookBtn.addEventListener("click",()=>{
    bookModal.showModal();
});

const newBookForm = document.querySelector("#newBookForm");

newBookForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    addBookToLibrary(title,author,pages,read);
    bookModal.close();
});

addBookToLibrary("Berserk Vol.1", "Kento Miura", 224, true);
addBookToLibrary("Nana Vol.1", "Ai Yazawa", 192, false);