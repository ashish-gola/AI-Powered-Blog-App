import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Sidebar = () => {
  const { setToken, navigate, axios } = useAppContext();

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/admin');
    toast.success('Logged out successfully');
  };

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

      <div className='mt-auto mb-4'>
        <button 
          onClick={logout}
          className='flex items-center gap-3 py-3.5 px-3 md:min-w-64 cursor-pointer text-red-600 hover:bg-red-50 w-full text-left'
        >
          <span className='w-5 min-w-4'>🚪</span>
          <p className='hidden md:inline-block'>Logout</p>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
