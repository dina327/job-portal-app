import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate=useNavigate()
  const {setShowRecruiterLogin}=useContext(AppContext)

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='shadow-md py-4 bg-white top-0 z-50'
    >
      <div className='w-full flex justify-between items-center px-2 sm:px-4 xl:px-20'>

        {/* Logo */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          src={assets.logo2}
          alt="Job Portal Logo"
          className='w-28 h-28 object-contain max-sm:w-20 ml-0 cursor-pointer'
          onClick={()=>navigate('/')}
        />

        {/* Conditional Buttons or User Info */}
        {user ? (
          <div className='flex items-center gap-3'>
            <Link
              to='/applications'
              className='text-sm text-gray-700 hover:text-emerald-600 transition duration-300 hover:underline font-medium'
            >
              Applied Jobs
            </Link>
            <p className='text-gray-800 text-sm font-medium'>
              Hi, <span className='text-blue-600'>{user.firstName + ' ' + user.lastName}</span>
            </p>
            <UserButton />
          </div>
        ) : (
          <div className='flex items-center gap-4 text-sm max-sm:text-xs'>

            {/* Recruiter Button with hover scale */}
            <motion.button
            onClick={e=>setShowRecruiterLogin(true)}
              whileHover={{ scale: 1.05 }}
              className='text-gray-800 underline hover:text-blue-700 transition duration-200 font-mediumunderline'
            >
              Recruiter Login
            </motion.button>

            {/* Student Login with motion hover */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openSignIn()}
              className='bg-blue-500 hover:bg-blue-700 text-white px-5 sm:px-7 py-2 rounded-full shadow-md transition duration-300 font-semibold'
            >
             Login
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
