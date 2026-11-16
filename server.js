
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// Sample book collection
let books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
    { id: 2, title: "Wings of Fire", author: "A.P.J. Abdul Kalam" }
];

// GET - View all books
app.get("/api/books", (req, res) => {
    res.json(books);
});

// POST - Add a new book
app.post("/api/books", (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: "Title and author are required"
        });
    }

    const newBook = {
        id: Date.now(),
        title: title,
        author: author
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});

// PUT - Update a book
app.put("/api/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;

    res.json({
        message: "Book updated successfully",
        book: book
    });
});

// DELETE - Delete a book
app.delete("/api/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const bookExists = books.some(b => b.id === id);

    if (!bookExists) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books = books.filter(b => b.id !== id);

    res.json({
        message: "Book deleted successfully"
    });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
