const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Title cannot be empty'
    }
  },
  author: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Author cannot be empty'
    }
  },
  genre: {
    type: String,
    trim: true
  },
  availabilityStatus: {
    type: String,
    enum: ['Available', 'Checked Out'],
    default: 'Available'
  }
}, {
  timestamps: true
});

// Remove the separate index creation
// bookSchema.index({ bookId: 1 }, { unique: true });

module.exports = mongoose.model('Book', bookSchema);