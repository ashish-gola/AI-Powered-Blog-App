import React from 'react'
import Navbar from '../components/Navbar'

const Blog = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Blog</h1>
        <p className="text-center text-gray-600">Blog content will be displayed here.</p>
      </div>
    </>
  )
}

export default Blog