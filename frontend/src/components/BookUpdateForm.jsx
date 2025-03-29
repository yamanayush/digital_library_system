import React, { useState } from 'react'
import axios from 'axios'
import { SearchIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react'

const API_BASE_URL = 'https://digital-library-system-backend.onrender.com'

const BookUpdateForm = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [foundBookId, setFoundBookId] = useState('')
  const [updateData, setUpdateData] = useState({
    title: '',
    author: '',
    genre: '',
    availabilityStatus: 'Available'
  })
  const [submitStatus, setSubmitStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e?.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    setSubmitStatus(null)

    try {
      console.log('Searching for book:', searchQuery)
      const searchUrl = `${API_BASE_URL}/api/books/search/${encodeURIComponent(searchQuery.trim())}`
      console.log('Search URL:', searchUrl)
      const response = await axios.get(searchUrl)
      console.log('Search response:', response.data)
      
      if (response.data && response.data.length > 0) {
        const book = response.data[0]
        console.log('Found book:', book)
        setFoundBookId(book.bookId)
        setUpdateData({
          title: book.title || '',
          author: book.author || '',
          genre: book.genre || '',
          availabilityStatus: book.availabilityStatus || 'Available'
        })
        setSubmitStatus(null)
      } else {
        console.log('No book found')
        setSubmitStatus({
          type: 'error',
          message: 'Book not found'
        })
        setFoundBookId('')
        setUpdateData({
          title: '',
          author: '',
          genre: '',
          availabilityStatus: 'Available'
        })
      }
    } catch (error) {
      console.error('Search error:', error)
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Error searching for book'
      })
      setFoundBookId('')
      setUpdateData({
        title: '',
        author: '',
        genre: '',
        availabilityStatus: 'Available'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdateData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!foundBookId || !updateData.title || !updateData.author) {
      setSubmitStatus({
        type: 'error',
        message: 'Book ID, title and author are required'
      })
      return
    }

    setLoading(true)
    setSubmitStatus(null)

    try {
      const updateUrl = `${API_BASE_URL}/api/books/${encodeURIComponent(foundBookId)}`
      console.log('Update URL:', updateUrl)
      console.log('Update data:', updateData)

      const response = await axios({
        method: 'PUT',
        url: updateUrl,
        data: {
          title: updateData.title.trim(),
          author: updateData.author.trim(),
          genre: updateData.genre.trim(),
          availabilityStatus: updateData.availabilityStatus
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Update response:', response.data)
      
      setSubmitStatus({
        type: 'success',
        message: 'Book updated successfully!'
      })

      // Clear form after 3 seconds on successful update
      setTimeout(() => {
        setSearchQuery('')
        setFoundBookId('')
        setUpdateData({
          title: '',
          author: '',
          genre: '',
          availabilityStatus: 'Available'
        })
        setSubmitStatus(null)
      }, 3000)
    } catch (error) {
      console.error('Update error:', error)
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to update book'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Update Book</h2>
        <p className="text-gray-600 mt-2">Search and modify book details</p>
      </div>

      {submitStatus && (
        <div 
          className={`p-4 rounded-lg flex items-center space-x-3 ${
            submitStatus.type === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}
        >
          {submitStatus.type === 'success' ? <CheckCircleIcon /> : <XCircleIcon />}
          <span>{submitStatus.message}</span>
        </div>
      )}

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6">
        <div className="relative flex-1">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Book ID or Title to search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md sm:rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={20} 
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-md sm:rounded-r-md text-white transition-colors ${
            loading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {updateData.title && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input 
                type="text" 
                name="title"
                value={updateData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
              <input 
                type="text" 
                name="author"
                value={updateData.author}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
              <input 
                type="text" 
                name="genre"
                value={updateData.genre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select 
                name="availabilityStatus"
                value={updateData.availabilityStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Available">Available</option>
                <option value="Checked Out">Checked Out</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md text-white transition-colors duration-300 ${
                loading 
                  ? 'bg-green-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? 'Updating...' : 'Update Book'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default BookUpdateForm

