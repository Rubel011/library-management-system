const express=require('express');
const { getListOfBooks, createBook, updateBook, deleteBook, searchByQuery } = require('../controllers/bookController');
const bookRouter=express.Router();

// List all available books
bookRouter.get("/",getListOfBooks);

// Add a new book
bookRouter.post("/",createBook);

// Update book details
bookRouter.put("/:id",updateBook);

// Delete a book
bookRouter.delete("/:id",deleteBook);

// Search functionality
bookRouter.get("/search",searchByQuery)

module.exports=bookRouter;