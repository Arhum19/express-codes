const express = require("express");
const fs = require("fs");
const port = 3000;
const app = express();

app.use(express.json()); // middleware

const booksFile = "./books.json";

let books = [];
if (fs.existsSync(booksFile)) {
  books = JSON.parse(fs.readFileSync(booksFile, "utf-8"));
} else {
  books = [
    { id: 1, name: "Lord of the Rings", author: "J.R.R. Tolkien" },
    { id: 2, name: "Harry Potter", author: "J.K. Rowling" },
    { id: 3, name: "The Alchemist", author: "Paulo Coelho" },
    { id: 4, name: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  ];
  fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
}

// Helper to save books to file
function saveBooks() {
  fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
}

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Get book by id
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json({ message: "Book found successfully!", book });
});

// Add a new book
app.post("/books", (req, res) => {
  const book = {
    id: books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1,
    name: req.body.name,
    author: req.body.author,
  };
  books.push(book);
  saveBooks();
  res.status(201).json({ message: "Book added successfully", book, allbooks: books });
});

// Delete a book
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }
  const deletedBook = books.splice(bookIndex, 1);
  saveBooks();
  res.json({ message: "Book deleted successfully", deletedBook, allbooks: books });
});

//Update a book
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }
  const updatedBook = { id, name: req.body.name, author: req.body.author };
  books[bookIndex] = updatedBook;
  saveBooks();
  res.json({ message: "Book updated successfully", book: updatedBook });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
