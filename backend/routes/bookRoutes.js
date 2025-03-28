const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Add a new book
router.post('/', bookController.addBook);

// Get all books
router.get('/', bookController.getAllBooks);

// Search books by ID or Title
router.get('/search/:query', bookController.searchBook);

// Update a book
router.put('/:bookId', bookController.updateBook);

// Delete a book
router.delete('/:bookId', bookController.deleteBook);

module.exports = router;