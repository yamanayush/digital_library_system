import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Trash2Icon, EditIcon } from 'lucide-react'

const BookList = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://digital-library-system-backend.onrender.com/api/books')
        setBooks(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch books')
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`https://digital-library-system-backend.onrender.com/api/books/${bookId}`)
      setBooks(books.filter(book => book.bookId !== bookId))
    } catch (err) {
      alert('Error deleting book: ' + err.response.data.message)
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>
  )

  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Book Inventory</h2>
        <p className="text-gray-600 mt-2">
          Total Books: {books.length}
        </p>
      </div>

      {books.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No books in the inventory
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div 
              key={book.bookId} 
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </div>
                <span 
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    book.availabilityStatus === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {book.availabilityStatus}
                </span>
              </div>
              
              <div className="border-t pt-3 mt-3 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>Book ID: {book.bookId}</p>
                  <p>Genre: {book.genre || 'Not specified'}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleDelete(book.bookId)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Delete Book"
                  >
                    <Trash2Icon size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BookList