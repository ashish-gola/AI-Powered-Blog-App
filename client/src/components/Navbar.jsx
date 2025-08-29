import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

const Navbar = () => {


  const {navigate, token} = useAppContext();
  


  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-40'>
      <img src={assets.logo} alt='Logo' className='w-32 sm:w-44' />
      <button 
        onClick={() => navigate('/admin')} 
        className='bg-primary text-white py-2.5 px-6 rounded-full flex text-sm cursor-pointer gap-2 items-center hover:bg-primary/90 transition-colors'
      >
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} alt='Arrow' className='w-3' />
      </button>
    </div>
  )
}

export default Navbar
