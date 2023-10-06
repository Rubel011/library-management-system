const express = require('express');
const Book = require('../models/bookModel');
const Borrowing = require('../models/borrowingModel');
const { authenticateToken } = require('../middleware/authentication');
const recommendationRouter = express.Router()

// API endpoint to get book recommendations for a user
recommendationRouter.get('/', authenticateToken,(req, res) => {
    const userId = req.user.userId;

    try {
        const recommendations = generateRecommendations(userId);
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Calculate user preferences based on genres
function calculateGenrePreferences(userId) {

    const userBorrowings = Borrowing.find({ userId });
    const genreCount = {};

    userBorrowings.forEach((borrowing) => {
        const book = Book.findById(borrowing.bookId);
        if (book && book.genre) {
            genreCount[book.genre] = (genreCount[book.genre] || 0) + 1;
        }
    });

    // Sort the genres by borrowing count
    const sortedGenres = Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a]);

    return sortedGenres;
}

// Generate book recommendations based on user preferences
function generateRecommendations(userId) {
    const userGenres = calculateGenrePreferences(userId);

    // Find books with genres matching the user's top genre preferences
    const recommendedBooks = [];

    userGenres.forEach((genre) => {
        const books = Book.find({ genre, quantity: { $gt: 0 } }).limit(5);
        recommendedBooks.push(...books);
    });

    return recommendedBooks;
}



module.exports=recommendationRouter;
