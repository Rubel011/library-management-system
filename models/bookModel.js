const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    ISBN: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;