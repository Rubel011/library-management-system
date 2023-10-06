const mongoose = require('mongoose');

const borrowingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', // Reference to the Book model
    },
    borrowed:{type:Boolean, default: true},
    returnDate: {type:Date, required: true}
});

const Borrowing = mongoose.model('Borrowing', borrowingSchema);

module.exports = Borrowing;