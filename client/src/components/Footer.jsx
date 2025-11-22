import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Footer = () => {
  const { setShowAdminLogin } = useContext(AppContext);

  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
      <div className='flex items-center gap-4 flex-1'>
        <p className='border-l-2 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>
          © 2025 dina.dev | All rights reserved.
        </p>

        {/* ✅ Open AdminLogin Modal */}
        <button
          onClick={() => setShowAdminLogin(true)}
          className='text-sm text-blue-600 hover:text-blue-800 font-medium'
        >
          Admin Login
        </button>
      </div>

      <div className='flex gap-2.5'>
        <img width={38} src={assets.facebookIcon} alt='Facebook' />
        <img width={38} src={assets.twitterIcon} alt='Twitter' />
        <img width={38} src={assets.instagramIcon} alt='Instagram' />
      </div>
    </div>
  );
};

export default Footer;
