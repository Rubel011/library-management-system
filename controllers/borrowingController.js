const { errorResponse, successResponse } = require("../helpers/successAndError");
const Book = require("../models/bookModel");
const Borrowing = require("../models/borrowingModel");


module.exports.borrowBook = async (req, res) => {
    const userId = req.user.userId; // You should have a user authentication system before coming to this route

    if (!userId) {
        return res.status(400).json(errorResponse(400, 'User ID is required'));
    }

    const bookId = req.params.bookId;

    try {
        // Check if there are available copies
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json(errorResponse(404, 'Book not found'));
        }

        if (book.quantity <= 0) {
            return res.status(400).json(errorResponse(400, 'No available copies of the book'));
        }

        // Check if the user has already borrowed the maximum allowed
        const userBorrowings = await Borrowing.find({ userId ,borrowed:true});
        if (userBorrowings.length >= 3) {
            return res.status(400).json(errorResponse(400, 'You can borrow up to 3 books at a time'));
        }

        // Create a borrowing record
        const borrowing = new Borrowing({
            userId,
            bookId,
            returnDate: new Date(req.body.returnDate),
        });

        await borrowing.save();

        // Decrement the quantity of available copies
        await Book.findByIdAndUpdate(bookId, { $inc: { quantity: -1 } });

        res.status(200).json(successResponse(200, 'Book borrowed successfully', borrowing))
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
}



module.exports.returnBook = async (req, res) => {
    const userId = req.user.userId; // You should have a user authentication system
    const bookId = req.params.bookId;

    try {
        // Find and delete the borrowing record
        const result = await Borrowing.findOneAndUpdate({ userId, bookId ,borrowed:true},{borrowed:false});

        if (!result) {
            return res.status(404).json(errorResponse(404, 'Book not found in user\'s borrowed list'));
        }

        // Increment the quantity of available copies
        await Book.findByIdAndUpdate(bookId, { $inc: { quantity: 1 } });

        res.status(200).json(successResponse(200, 'Book returned successfully', null));
    } catch (error) {
        res.status(500).json(errorResponse(500, error.message));
    }
}