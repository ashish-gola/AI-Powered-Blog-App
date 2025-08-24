import React, { use } from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {


  const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-3 mt-2 p-4 cursor-pointer'>
      <img onClick={() => navigate('/')} src={assets.logo} alt='Logo' className='w-32 sm:w-44' />
      <button className='bg-primary text-white py-2.5 px-10 rounded-full flex text-sm cursor-pointer gap-2 items-center'>
        Login
        <img onClick={() => navigate('/admin')} src={assets.arrow} alt='Arrow' className='w-3' />
      </button>
    </div>
  )
}

export default Navbar
