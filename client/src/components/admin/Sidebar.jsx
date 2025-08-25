import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-slate-100 min-h-screen'>
      <NavLink 
        end={true} 
        to='/admin' 
        className={({ isActive }) => 
          `flex items-center gap-3 py-3.5 px-3 md:min-w-64 cursor-pointer ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          }`
        }
      >
        <img src={assets.home_icon} alt="Dashboard" className='w-5 min-w-4' />
        <p className='hidden md:inline-block'>Dashboard</p>
      </NavLink>

      <NavLink 
        end={true} 
        to='/admin/addBlog' 
        className={({ isActive }) => 
          `flex items-center gap-3 py-3.5 px-3 md:min-w-64 cursor-pointer ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          }`
        }
      >
        <img src={assets.add_icon} alt="Add Blog" className='w-5 min-w-4' />
        <p className='hidden md:inline-block'>Add Blog</p>
      </NavLink>

      <NavLink 
        end={true} 
        to='/admin/listBlog' 
        className={({ isActive }) => 
          `flex items-center gap-3 py-3.5 px-3 md:min-w-64 cursor-pointer ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          }`
        }
      >
        <img src={assets.list_icon} alt="List Blog" className='w-5 min-w-4' />
        <p className='hidden md:inline-block'>List Blog</p>
      </NavLink>

      <NavLink 
        end={true} 
        to='/admin/comments' 
        className={({ isActive }) => 
          `flex items-center gap-3 py-3.5 px-3 md:min-w-64 cursor-pointer ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          }`
        }
      >
        <img src={assets.comment_icon} alt="Comments" className='w-5 min-w-4' />
        <p className='hidden md:inline-block'>Comments</p>
      </NavLink>


    </div>
  )
}

export default Sidebar
