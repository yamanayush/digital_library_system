import React, { useState } from 'react'
import axios from 'axios'
import { CheckCircleIcon, XCircleIcon } from 'lucide-react'

const BookForm = () => {
  const [formData, setFormData] = useState({
    bookId: '',
    title: '',
    author: '',
    genre: '',
    availabilityStatus: 'Available'
  })
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus(null)

    try {
      const response = await axios.post('http://localhost:5000/api/books', formData)
      
      setSubmitStatus({
        type: 'success',
        message: 'Book added successfully!'
      })

      // Reset form after successful submission
      setFormData({
        bookId: '',
        title: '',
        author: '',
        genre: '',
        availabilityStatus: 'Available'
      })

      // Clear status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000)
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to add book'
      })

      // Clear status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Add New Book</h2>
        <p className="text-gray-600 mt-2">Enter details of the book you want to add to the library</p>
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Book ID</label>
            <input 
              type="text" 
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
            <input 
              type="text" 
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
            <input 
              type="text" 
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
          <select 
            name="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Available">Available</option>
            <option value="Checked Out">Checked Out</option>
          </select>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <span>Add Book</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookForm