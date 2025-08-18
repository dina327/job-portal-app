import React from 'react';
import { assets } from '../assets/assets';

const AppDownload = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto my-20'>
      <div className='relative bg-gradient-to-r from-violet-50 to-purple-50 p-12 sm:p-24 lg:p-32 rounded-lg'>
        <div>
          <h1 className='text-2xl sm:text-4xl font-bolf mb-8 max-w-md'>Download Mobile App For Better Experience</h1>
          <div className='flex gap-15'>
            <a href="#" className='inline-block'>
              <img className='h-17' src={assets.playStore} alt="" />
            </a>
            <a href="#" className='inline-block'>
              <img className='h-20' src={assets.appStore} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;

