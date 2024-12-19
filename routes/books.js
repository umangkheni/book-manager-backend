const express = require('express');
const { Book, validateBook } = require('../models/Book');
const { validationResult } = require('express-validator');
const router = express.Router();

// Middleware to handle errors
const errorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// GET /books: Fetch all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /books: Add a new book
router.post('/', validateBook, errorMiddleware, async (req, res) => {
    const newBook = new Book(req.body);
    try {
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 