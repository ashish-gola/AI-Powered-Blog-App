import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h2 className='md:text-4xl text-2xl font-semibold'>Never Miss a Blog!</h2>
      <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe to get the latest blog, new tech, and exclusive news.</p>
      <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'> 
        <input className='border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500' type="email" placeholder="Enter your email Id" />
        <button className='md:px-12 px-8 h-full bg-primary/80 text-white hover:bg-primary transition-all cursor-pointer rounded-md rounded-1-none' type="submit">Subscribe</button>
      </form>   
    </div>
  )
}

export default Newsletter
