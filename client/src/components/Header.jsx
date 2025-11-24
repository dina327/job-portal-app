import React, { useContext,useRef } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const {setSearchFilter,setIsSearched}=useContext(AppContext)
  const titleRef=useRef(null)
  const locationRef=useRef(null)
  const onSearch=()=>{
    setSearchFilter({
      title:titleRef.current.value,
      location:locationRef.current.value
    })
    setIsSearched(true)
    titleRef.current.value = "";
  locationRef.current.value = "";
    
  }
  return (
    <div className='container 2xl:px-20 mx-auto my-10 px-4'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='bg-gradient-to-r from-purple-700 to-purple-900 text-white py-16 text-center rounded-2xl shadow-lg'
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='text-3xl md:text-4xl font-semibold mb-4 px-2'
        >
          Over 1,000+ jobs to apply
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className='mb-8 max-w-2xl mx-auto text-base md:text-lg font-light px-4'
        >
          Your Next Big Career Move Starts Right Here- Explore the Best Job Opportunities and Take the First Step Toward Your Future!
        </motion.p>

        <div className='flex flex-col sm:flex-row items-stretch gap-2 bg-white rounded-xl text-gray-600 max-w-2xl mx-auto px-4 py-3 shadow-md transition hover:shadow-lg'>
          <div className='flex items-center flex-1 gap-2'>
            <img
              src={assets.searchIcon}
              alt="Search"
              className='w-5 h-5 object-contain'
            />
            <input
              type="text"
              placeholder='Search job (e.g. Web Development)'
              className='p-2 rounded outline-none w-full text-sm'
              ref={titleRef}
            />
          </div>

          <div className='flex items-center flex-1 gap-2'>
            <img
              src={assets.locationIcon}
              alt="Location"
              className='w-5 h-5 object-contain'
            />
            <input
              type="text"
              placeholder='Location (e.g. Addis Ababa)'
              className='p-2 rounded outline-none w-full text-sm'
              ref={locationRef}
            />
          </div>

          <button onClick={onSearch} className='bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-full font-medium'>
            Search
          </button>
        </div>
      </motion.div>
      <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
        <div className='flex jusify-center gap-10 lg:gap-16 flex-wrap'  >
          <p className='font-medium'>Trusted by</p>
          <img className='h-9' src={assets.microsoft} alt="" />
          <img className='h-9' src={assets.shega} alt="" />
          <img className='h-9' src={assets.science} alt="" />
          <img className='h-9' src={assets.samsung} alt="" />
          <img className='h-9' src={assets.amazon} alt="" />
          <img className='h-9' src={assets.addis} alt="" />
          <img className='h-9' src={assets.adobe} alt="" />
          <img className='h-9' src={assets.itsc} alt="" />

          
        </div>
      </div>
    </div>
  );
};

export default Header;
