const mongoose = require("mongoose");
const { body } = require('express-validator');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
});

const Book = mongoose.model("Book", bookSchema);

// Validation middleware for book creation
const validateBook = [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
];

module.exports = { Book, validateBook };