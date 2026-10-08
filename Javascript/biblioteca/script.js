//Arreglo de libros
const myLibrary = [];

//Constructor
function Book(title, autor, page, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.autor = autor;
  this.page = page;
  this.read = read;
}

//Metodo para cambiar el estado
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

//Metodo para agregar el libro
function addBookToLibrary(title, autor, page, read) {
  const newBook = new Book(title, autor, page, read);
  myLibrary.push(newBook);
}

//Funcion para crear la tarjeta
function createCard(book) {
  const card = document.createElement("div");
  card.classList.add("book-card");
  card.dataset.id = book.id;

  const title = document.createElement("h3");
  title.textContent = book.title;
  card.appendChild(title);

  const autor = document.createElement("p");
  autor.textContent = book.autor;
  card.appendChild(autor);

  const pages = document.createElement("p");
  pages.textContent = `Páginas: ${book.page}`;
  card.appendChild(pages);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("btn", "btn-danger");
  removeBtn.textContent = "Eliminar";
  removeBtn.addEventListener("click", () => {
    removeBookFromLibrary(book.id);
    card.remove();
  });
  card.appendChild(removeBtn);

  const readBtn = document.createElement("button");
  readBtn.classList.add("btn", "btn-status", book.read ? "read" : "not-read");
  readBtn.textContent = book.read ? "Leído" : "No leído";
  readBtn.addEventListener("click", () => {
    book.toggleRead();
    readBtn.textContent = book.read ? "Leído" : "No leído";
    readBtn.className = `btn btn-status ${book.read ? "read" : "not-read"}`;
  });
  card.appendChild(readBtn);

  return card;
}

//Funcion para mostrar los libros
function displayBooks() {
  const libraryContainer = document.getElementById("library-container");
  libraryContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const newCard = createCard(book);
    libraryContainer.appendChild(newCard);
  });
}

function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

const addBookBtn = document.getElementById("new-book-btn");
addBookBtn.addEventListener("click", () => {
  const bookModal = document.getElementById("book-modal");
  bookModal.showModal();
});

const cancelBookBtn = document.getElementById("close-modal-btn");
cancelBookBtn.addEventListener("click", () => {
  const bookModal = document.getElementById("book-modal");
  bookModal.close();
});

const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const autor = document.getElementById("author").value;
  const page = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, autor, page, read);

  displayBooks();
  clearInputs();

  const bookModal = document.getElementById("book-modal");
  bookModal.close();
});

function clearInputs() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;
}
