const express = require('express');
const Book = require('../models/bookModel');
const Borrowing = require('../models/borrowingModel');
const { authenticateToken } = require('../middleware/authentication');
const { errorResponse, successResponse } = require('../helpers/successAndError');
const recommendationRouter = express.Router()

// API endpoint to get book recommendations for a user
recommendationRouter.get('/', authenticateToken,async (req, res) => {
    const userId = req.user.userId;

    try {
        const recommendations = await generateRecommendations(userId);
        res.status(200).json(successResponse(200,"Retrive recommendations for user successfully",recommendations));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Calculate user preferences based on genres
async function calculateGenrePreferences(userId) {
    try {
        // Use async/await to await the result of the MongoDB query
        const userBorrowings = await Borrowing.find({ userId });

        let genreCount = {};

        if (userBorrowings.length <= 0) return null;

        // Use a for...of loop to iterate over userBorrowings
        for (const borrowing of userBorrowings) {
            // Use await when querying the Book collection
            const book = await Book.findById(borrowing.bookId);
            if (book && book.genre) {
                genreCount[book.genre] = (genreCount[book.genre] || 0) + 1;
            }
        }
        // Sort the genres by borrowing count
        const sortedGenres =Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a]);

        return sortedGenres;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Generate book recommendations based on user preferences
async function generateRecommendations(userId) {
    try {
        const userGenres = await calculateGenrePreferences(userId);
        if (!userGenres) return errorResponse(500, "User id is not found");

        // Find books with genres matching the user's top genre preferences
        const recommendedBooks = [];

        for (const genre of userGenres) {
            // Use await when querying the Book collection
            const books = await Book.find({ genre, quantity: { $gt: 0 },available:true }).limit(5);
            recommendedBooks.push(...books);
        }
        console.log(recommendedBooks);

        return recommendedBooks;
    } catch (error) {
        console.error(error);
        return null;
    }
}


module.exports = recommendationRouter;
