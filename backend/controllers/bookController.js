const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    const { bookId, title, author, genre, availabilityStatus } = req.body;
    
    console.log('Received book data:', req.body);

    // Check if book with same ID already exists
    const existingBook = await Book.findOne({ bookId });
    if (existingBook) {
      return res.status(400).json({ message: 'Book ID must be unique' });
    }

    const newBook = new Book({
      bookId,
      title,
      author,
      genre,
      availabilityStatus: availabilityStatus || 'Available'
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(400).json({ 
      message: error.message || 'Failed to add book',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ 
      message: 'Failed to fetch books',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

exports.searchBook = async (req, res) => {
  try {
    const { query } = req.params;
    console.log('Search query received:', query);

    // First try to find exact match by bookId
    let books = await Book.findOne({ bookId: query });
    
    if (books) {
      console.log('Found exact match:', books);
      return res.status(200).json([books]); // Wrap single result in array for consistency
    }

    // If no exact match found, try partial matches
    books = await Book.find({
      $or: [
        { bookId: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ]
    });

    console.log('Search results:', books);

    if (!books || books.length === 0) {
      console.log('No books found for query:', query);
      return res.status(404).json({ message: 'No books found matching the search criteria' });
    }

    res.status(200).json(books);
  } catch (error) {
    console.error('Search error:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      message: 'Error searching books', 
      error: process.env.NODE_ENV === 'development' ? error.message : {} 
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const updates = req.body;

    console.log('Update request received:', {
      bookId,
      updates
    });

    // Validate required fields
    if (!updates.title || !updates.author) {
      console.log('Validation failed: Missing title or author');
      return res.status(400).json({ message: 'Title and author are required' });
    }

    // First check if the book exists - use exact match
    const existingBook = await Book.findOne({ bookId: bookId });
    console.log('Existing book check result:', existingBook);

    if (!existingBook) {
      console.log('Book not found:', bookId);
      return res.status(404).json({ message: 'Book not found' });
    }

    console.log('Existing book found:', existingBook);

    // Prepare update data with all fields
    const updateData = {
      title: updates.title,
      author: updates.author,
      genre: updates.genre || existingBook.genre,
      availabilityStatus: updates.availabilityStatus || existingBook.availabilityStatus
    };

    console.log('Updating book with data:', updateData);

    // Update the book using findOneAndUpdate with the exact bookId match
    const updatedBook = await Book.findOneAndUpdate(
      { bookId: bookId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      console.log('Update failed - book not found after update attempt');
      return res.status(404).json({ message: 'Book not found after update attempt' });
    }

    console.log('Book updated successfully:', updatedBook);
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', {
      message: error.message,
      stack: error.stack
    });
    res.status(400).json({ 
      message: error.message || 'Failed to update book',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findOneAndDelete({ bookId });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ 
      message: 'Failed to delete book',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};