const express = require('express');
const { authenticateToken } = require('../middleware/authentication');
const { borrowBook, returnBook } = require('../controllers/borrowingController');
const borrowingRouter = express.Router();


borrowingRouter.post("/:bookId",authenticateToken,borrowBook)


borrowingRouter.post("/return/:bookId",authenticateToken,returnBook)


module.exports=borrowingRouter