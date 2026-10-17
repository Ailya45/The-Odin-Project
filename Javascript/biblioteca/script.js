// 1. Clase Book para representar cada libro individual
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // Booleano: true / false
  }

  // Método para alternar el estado de lectura
  toggleReadStatus() {
    this.read = !this.read;
  }
}

// 2. Clase Library para gestionar la colección de libros de forma privada y segura
class Library {
  #books; // Propiedad privada nativa

  constructor() {
    this.#books = [];
  }

  addBook(book) {
    this.#books.push(book);
  }

  removeBook(index) {
    this.#books.splice(index, 1);
  }

  getBooks() {
    return this.#books;
  }

  getBook(index) {
    return this.#books[index];
  }
}

// Instancia global de la biblioteca
const myLibrary = new Library();

// Agregamos un par de libros de prueba iniciales
myLibrary.addBook(
  new Book("Cien años de soledad", "Gabriel García Márquez", 471, true),
);
myLibrary.addBook(
  new Book("El Principito", "Antoine de Saint-Exupéry", 96, false),
);

// 3. Clase UIController para manejar todo lo relacionado con el DOM y los eventos
class UIController {
  static render() {
    const libraryContainer = document.querySelector("#library-container");
    libraryContainer.innerHTML = ""; // Limpiamos la grilla

    const books = myLibrary.getBooks();

    books.forEach((book, index) => {
      const card = document.createElement("div");
      card.classList.add("book-card"); // Asegúrate de que esta clase coincida con tu CSS

      card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Autor:</strong> ${book.author}</p>
        <p><strong>Páginas:</strong> ${book.pages}</p>
        <p><strong>Estado:</strong> <span class="${book.read ? "status-read" : "status-unread"}">${book.read ? "Leído 📖" : "Pendiente ⏳"}</span></p>
        <div class="card-actions">
          <button class="btn btn-toggle" data-index="${index}">Cambiar Estado</button>
          <button class="btn btn-delete" data-index="${index}">Eliminar</button>
        </div>
      `;

      libraryContainer.appendChild(card);
    });
  }

  static bindEvents() {
    const modal = document.querySelector("#book-modal");
    const newBookBtn = document.querySelector("#new-book-btn");
    const closeModalBtn = document.querySelector("#close-modal-btn");
    const bookForm = document.querySelector("#book-form");
    const libraryContainer = document.querySelector("#library-container");

    // Abrir modal nativo
    newBookBtn.addEventListener("click", () => {
      modal.showModal();
    });

    // Cerrar modal nativo
    closeModalBtn.addEventListener("click", () => {
      modal.close();
      bookForm.reset();
    });

    // Enviar formulario para crear un nuevo libro
    bookForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.querySelector("#title").value;
      const author = document.querySelector("#author").value;
      const pages = Number(document.querySelector("#pages").value);
      const read = document.querySelector("#read").checked;

      // Creamos la instancia con la clase Book
      const newBook = new Book(title, author, pages, read);
      myLibrary.addBook(newBook);

      UIController.render();
      bookForm.reset();
      modal.close();
    });

    // Delegación de eventos para eliminar o cambiar estado de los libros
    libraryContainer.addEventListener("click", (e) => {
      const index = Number(e.target.dataset.index);

      if (e.target.classList.contains("btn-delete")) {
        myLibrary.removeBook(index);
        UIController.render();
      }

      if (e.target.classList.contains("btn-toggle")) {
        const book = myLibrary.getBook(index);
        book.toggleReadStatus();
        UIController.render();
      }
    });
  }
}

// Inicializamos la aplicación al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  UIController.render();
  UIController.bindEvents();
});

// //Arreglo de libros
// const myLibrary = [];

// //Constructor
// function Book(title, autor, page, read) {
//   this.id = crypto.randomUUID();
//   this.title = title;
//   this.autor = autor;
//   this.page = page;
//   this.read = read;
// }

// //Metodo para cambiar el estado
// Book.prototype.toggleRead = function () {
//   this.read = !this.read;
// };

// //Metodo para agregar el libro
// function addBookToLibrary(title, autor, page, read) {
//   const newBook = new Book(title, autor, page, read);
//   myLibrary.push(newBook);
// }

// //Funcion para crear la tarjeta
// function createCard(book) {
//   const card = document.createElement("div");
//   card.classList.add("book-card");
//   card.dataset.id = book.id;

//   const title = document.createElement("h3");
//   title.textContent = book.title;
//   card.appendChild(title);

//   const autor = document.createElement("p");
//   autor.textContent = book.autor;
//   card.appendChild(autor);

//   const pages = document.createElement("p");
//   pages.textContent = `Páginas: ${book.page}`;
//   card.appendChild(pages);

//   const removeBtn = document.createElement("button");
//   removeBtn.classList.add("btn", "btn-danger");
//   removeBtn.textContent = "Eliminar";
//   removeBtn.addEventListener("click", () => {
//     removeBookFromLibrary(book.id);
//     card.remove();
//   });
//   card.appendChild(removeBtn);

//   const readBtn = document.createElement("button");
//   readBtn.classList.add("btn", "btn-status", book.read ? "read" : "not-read");
//   readBtn.textContent = book.read ? "Leído" : "No leído";
//   readBtn.addEventListener("click", () => {
//     book.toggleRead();
//     readBtn.textContent = book.read ? "Leído" : "No leído";
//     readBtn.className = `btn btn-status ${book.read ? "read" : "not-read"}`;
//   });
//   card.appendChild(readBtn);

//   return card;
// }

// //Funcion para mostrar los libros
// function displayBooks() {
//   const libraryContainer = document.getElementById("library-container");
//   libraryContainer.innerHTML = "";

//   myLibrary.forEach((book) => {
//     const newCard = createCard(book);
//     libraryContainer.appendChild(newCard);
//   });
// }

// function removeBookFromLibrary(id) {
//   const index = myLibrary.findIndex((book) => book.id === id);
//   if (index !== -1) {
//     myLibrary.splice(index, 1);
//   }
// }

// const addBookBtn = document.getElementById("new-book-btn");
// addBookBtn.addEventListener("click", () => {
//   const bookModal = document.getElementById("book-modal");
//   bookModal.showModal();
// });

// const cancelBookBtn = document.getElementById("close-modal-btn");
// cancelBookBtn.addEventListener("click", () => {
//   const bookModal = document.getElementById("book-modal");
//   bookModal.close();
// });

// const bookForm = document.getElementById("book-form");
// bookForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const title = document.getElementById("title").value;
//   const autor = document.getElementById("author").value;
//   const page = document.getElementById("pages").value;
//   const read = document.getElementById("read").checked;

//   addBookToLibrary(title, autor, page, read);

//   displayBooks();
//   clearInputs();

//   const bookModal = document.getElementById("book-modal");
//   bookModal.close();
// });

// function clearInputs() {
//   document.getElementById("title").value = "";
//   document.getElementById("author").value = "";
//   document.getElementById("pages").value = "";
//   document.getElementById("read").checked = false;
// }
