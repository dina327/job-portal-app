import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import JobListing from '../components/JobListing';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';


const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <JobListing />
      <AppDownload />
      
      <Footer />
    </div>
  );
}

export default Home;
