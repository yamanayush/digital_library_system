// import React, { useState } from 'react'
// import axios from 'axios'
// import { SearchIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react'

// const BookUpdateForm = () => {
//   const [bookId, setBookId] = useState('')
//   const [updateData, setUpdateData] = useState({
//     title: '',
//     author: '',
//     genre: '',
//     availabilityStatus: 'Available'
//   })
//   const [submitStatus, setSubmitStatus] = useState(null)
//   const [loading, setLoading] = useState(false)

//   const handleSearch = async (e) => {
//     e?.preventDefault()
//     if (!bookId.trim()) return

//     setLoading(true)
//     setSubmitStatus(null)

//     try {
//       console.log('Searching for book:', bookId)
//       const response = await axios.get(`https://digital-library-system-backend.onrender.com/api/books/search/${encodeURIComponent(bookId.trim())}`)
//       console.log('Search response:', response.data)
      
//       if (response.data && response.data.length > 0) {
//         const book = response.data[0]
//         console.log('Found book:', book)
//         setUpdateData({
//           title: book.title || '',
//           author: book.author || '',
//           genre: book.genre || '',
//           availabilityStatus: book.availabilityStatus || 'Available'
//         })
//         setSubmitStatus(null)
//       } else {
//         console.log('No book found')
//         setSubmitStatus({
//           type: 'error',
//           message: 'Book not found'
//         })
//         setUpdateData({
//           title: '',
//           author: '',
//           genre: '',
//           availabilityStatus: 'Available'
//         })
//       }
//     } catch (error) {
//       console.error('Search error:', error)
//       setSubmitStatus({
//         type: 'error',
//         message: error.response?.data?.message || 'Error searching for book'
//       })
//       setUpdateData({
//         title: '',
//         author: '',
//         genre: '',
//         availabilityStatus: 'Available'
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setUpdateData(prevState => ({
//       ...prevState,
//       [name]: value
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!bookId.trim() || !updateData.title || !updateData.author) {
//       setSubmitStatus({
//         type: 'error',
//         message: 'Book ID, title and author are required'
//       })
//       return
//     }

//     setLoading(true)
//     setSubmitStatus(null)

//     try {
//       console.log('Updating book:', { bookId, updateData })
//       const response = await axios.put(`https://digital-library-system-backend.onrender.com/api/books/${encodeURIComponent(bookId.trim())}`, {
//         ...updateData,
//         bookId: bookId.trim()
//       })
//       console.log('Update response:', response.data)
      
//       setSubmitStatus({
//         type: 'success',
//         message: 'Book updated successfully!'
//       })

//       setTimeout(() => {
//         setBookId('')
//         setUpdateData({
//           title: '',
//           author: '',
//           genre: '',
//           availabilityStatus: 'Available'
//         })
//         setSubmitStatus(null)
//       }, 3000)
//     } catch (error) {
//       console.error('Update error:', error)
//       setSubmitStatus({
//         type: 'error',
//         message: error.response?.data?.message || 'Failed to update book'
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-800">Update Book</h2>
//         <p className="text-gray-600 mt-2">Search and modify book details</p>
//       </div>

//       {submitStatus && (
//         <div 
//           className={`p-4 rounded-lg flex items-center space-x-3 ${
//             submitStatus.type === 'success' 
//               ? 'bg-green-100 text-green-800' 
//               : 'bg-red-100 text-red-800'
//           }`}
//         >
//           {submitStatus.type === 'success' ? <CheckCircleIcon /> : <XCircleIcon />}
//           <span>{submitStatus.message}</span>
//         </div>
//       )}

//       <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6">
//         <div className="relative flex-1">
//           <input 
//             type="text" 
//             value={bookId}
//             onChange={(e) => setBookId(e.target.value)}
//             placeholder="Enter Book ID to update"
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md sm:rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <SearchIcon 
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
//             size={20} 
//           />
//         </div>
//         <button 
//           type="submit"
//           disabled={loading}
//           className={`px-4 py-2 rounded-md sm:rounded-r-md text-white transition-colors ${
//             loading 
//               ? 'bg-blue-400 cursor-not-allowed' 
//               : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           {loading ? 'Searching...' : 'Search'}
//         </button>
//       </form>

//       {updateData.title && (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//               <input 
//                 type="text" 
//                 name="title"
//                 value={updateData.title}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
//               <input 
//                 type="text" 
//                 name="author"
//                 value={updateData.author}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
//               <input 
//                 type="text" 
//                 name="genre"
//                 value={updateData.genre}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
//               <select 
//                 name="availabilityStatus"
//                 value={updateData.availabilityStatus}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="Available">Available</option>
//                 <option value="Checked Out">Checked Out</option>
//               </select>
//             </div>
//           </div>

//           <div className="pt-4">
//             <button 
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 rounded-md text-white transition-colors duration-300 ${
//                 loading 
//                   ? 'bg-green-400 cursor-not-allowed' 
//                   : 'bg-green-600 hover:bg-green-700'
//               }`}
//             >
//               {loading ? 'Updating...' : 'Update Book'}
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   )
// }

// export default BookUpdateForm

import React, { useState } from 'react'
 import axios from 'axios'
 import { SearchIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react'
 
 const BookUpdateForm = () => {
   const [searchId, setSearchId] = useState('')
   const [originalBookId, setOriginalBookId] = useState('')
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
     if (!searchId.trim()) return
 
     setLoading(true)
     setSubmitStatus(null)
 
     try {
       console.log('Searching for book with ID:', searchId)
       const searchUrl = `https://digital-library-system-backend.onrender.com/api/books/search/${encodeURIComponent(searchId.trim())}`
       console.log('Search URL:', searchUrl)
       
       const response = await axios.get(searchUrl)
       console.log('Search response:', response.data)
       
       if (response.data && response.data.length > 0) {
         const book = response.data[0]
         console.log('Setting form data with book:', book)
         setOriginalBookId(book.bookId) // Store the original bookId
         setUpdateData({
           title: book.title || '',
           author: book.author || '',
           genre: book.genre || '',
           availabilityStatus: book.availabilityStatus || 'Available'
         })
         setSubmitStatus(null)
       } else {
         console.log('No book found with ID:', searchId)
         setSubmitStatus({
           type: 'error',
           message: 'Book not found'
         })
         setOriginalBookId('')
         setUpdateData({
           title: '',
           author: '',
           genre: '',
           availabilityStatus: 'Available'
         })
       }
     } catch (error) {
       console.error('Search error:', {
         message: error.message,
         response: error.response?.data
       })
       setSubmitStatus({
         type: 'error',
         message: error.response?.data?.message || 'Error searching for book'
       })
       setOriginalBookId('')
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
     if (!originalBookId || !updateData.title || !updateData.author) {
       setSubmitStatus({
         type: 'error',
         message: 'Book ID, title and author are required'
       })
       return
     }
 
     setLoading(true)
     setSubmitStatus(null)
 
     try {
       const dataToUpdate = {
         title: updateData.title.trim(),
         author: updateData.author.trim(),
         genre: updateData.genre.trim(),
         availabilityStatus: updateData.availabilityStatus
       }
 
       const updateUrl = `https://digital-library-system-backend.onrender.com/api/books/${encodeURIComponent(originalBookId)}`
       console.log('Sending update request:', {
         url: updateUrl,
         data: dataToUpdate
       })
       
       const response = await axios.put(updateUrl, dataToUpdate)
       console.log('Update response:', response.data)
       
       if (response.data) {
         setSubmitStatus({
           type: 'success',
           message: 'Book updated successfully!'
         })
         
         // Update the form with the new data
         setUpdateData({
           title: response.data.title,
           author: response.data.author,
           genre: response.data.genre || '',
           availabilityStatus: response.data.availabilityStatus
         })
       }
     } catch (error) {
       console.error('Update error:', {
         message: error.message,
         response: error.response?.data
       })
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
 
       <form onSubmit={handleSearch} className="flex items-center mb-6">
         <div className="relative w-full">
           <input 
             type="text" 
             value={searchId}
             onChange={(e) => setSearchId(e.target.value)}
             placeholder="Enter Book ID to update"
             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
           />
           <SearchIcon 
             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
             size={20} 
           />
         </div>
         <button 
           type="submit"
           disabled={loading}
           className={`px-4 py-2 rounded-r-md text-white transition-colors ${
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
           <div className="grid md:grid-cols-2 gap-4">
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
 
           <div className="grid md:grid-cols-2 gap-4">
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