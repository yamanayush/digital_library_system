// import React from 'react'
// import BookList from './components/BookList'
// import BookForm from './components/BookForm'
// import BookSearch from './components/BookSearch'
// import BookUpdateForm from './components/BookUpdateForm'

// function App() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Library Management System</h1>
//       <div className="grid md:grid-cols-2 gap-6">
//         <div>
//           <BookForm />
//           <BookSearch />
//         </div>
//         <BookList />
//       </div>
//       <BookUpdateForm />
//     </div>
//   )
// }

// export default App

import React, { useState } from 'react'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import BookSearch from './components/BookSearch'
import BookUpdateForm from './components/BookUpdateForm'
import { BookIcon, PlusCircleIcon, SearchIcon, EditIcon } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('list')

  const renderContent = () => {
    switch(activeTab) {
      case 'add':
        return <BookForm />
      case 'update':
        return <BookUpdateForm />
      case 'search':
        return <BookSearch />
      default:
        return <BookList />
    }
  }

  const navItems = [
    { id: 'list', label: 'Book List', icon: BookIcon },
    { id: 'add', label: 'Add Book', icon: PlusCircleIcon },
    { id: 'search', label: 'Search', icon: SearchIcon },
    { id: 'update', label: 'Update', icon: EditIcon }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BookIcon className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Library
              </h1>
            </div>
            <div className="hidden md:flex space-x-1">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2
                    ${activeTab === id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App