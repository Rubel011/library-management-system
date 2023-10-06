const { successResponse, errorResponse } = require("../helpers/successAndError");
const Book = require("../models/bookModel");

module.exports.getListOfBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(201).json(successResponse(201, "retrive all books successfully", books));
    } catch (error) {
        res.status(400).json(errorResponse(400, "error retriving all books"));
    }
}

module.exports.createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(successResponse(201, "new book created successfully", book));
    } catch (error) {
        res.status(400).json(errorResponse(400, error.message));
    }
}

// Update book details
module.exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) {
            return res.status(404).json(errorResponse(404,'Book not found'));
        }
        res.status(200).json(successResponse(200,"Book updated successfully",book));
    } catch (error) {
        res.status(400).json(errorResponse(400,"error updating book"));
    }
}

// Delete a book
module.exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndRemove(req.params.id);
        if (!book) {
            return res.status(404).json(errorResponse(404,'Book not found'));
        }
        res.status(200).json(successResponse(200,'Book deleted successfully',null));
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.searchByQuery = async (req, res) => {
    const { title, author, ISBN ,publishedYear,available} = req.query;
    const searchQuery = {};

    if (title) {
        searchQuery.title = { $regex: new RegExp(title, 'i') };
    }

    if (author) {
        searchQuery.author = { $regex: new RegExp(author, 'i') };
    }

    if (ISBN) {
        searchQuery.ISBN = ISBN;
    }
    if (publishedYear) {
        searchQuery.publishedYear = publishedYear;
    }
    if (available) {
        searchQuery.available = available;
    }

    try {
        console.log(searchQuery);
        const books = await Book.find(searchQuery);
        res.status(200).json(successResponse(200,"Success found books", books));
    } catch (error) {
        res.status(500).json(errorResponse(500,error.message));
    }
}