import React, { useState } from 'react'
import { blogCategories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import BlogCard from './BlogCard';

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blog, input } = useAppContext();

  const filteredBlogs = () => {
    if( input === '') {
      return blog
    }
    return blog.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()));
  }

  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-6 my-10'>
        {blogCategories.map((item) => ( 
            <div key={item} className='relative'>
                <button
                  onClick={() => setMenu(item)}
                  className={`cursor-pointer px-4 py-1 transition-colors duration-200 ${
                    menu === item 
                      ? 'text-white bg-primary rounded-full' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {item}
                </button>
            </div>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {filteredBlogs().filter((blog) => menu === "All" ? true : blog.category === menu).map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
