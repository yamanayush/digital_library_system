import React, { useState } from 'react'
import axios from 'axios'
import { SearchIcon } from 'lucide-react'

const BookSearch = () => {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`https://digital-library-system-backend.onrender.com/api/books/search/${query}`)
      setSearchResults(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to search books')
      setSearchResults([])
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Search Books</h2>
        <p className="text-gray-600 mt-2">Find books by ID or Title</p>
      </div>

      <form onSubmit={handleSearch} className="flex items-center mb-6">
        <div className="relative w-full">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Book ID or Title"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={20} 
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {searchResults.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Search Results ({searchResults.length} book{searchResults.length !== 1 ? 's' : ''})
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((book) => (
              <div 
                key={book.bookId} 
                className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{book.title}</h4>
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
                <div className="border-t pt-3 mt-3">
                  <p className="text-sm text-gray-600">Book ID: {book.bookId}</p>
                  <p className="text-sm text-gray-600">Genre: {book.genre || 'Not specified'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BookSearch