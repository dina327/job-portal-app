import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, jobCategories, jobLocations } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(c => c !== location)
        : [...prev, location]
    );
  };
useEffect(() => {
  const newFilteredJobs = jobs.slice().reverse().filter(job => {
    // Normalize job data
    const jobCategory = job.category?.toLowerCase().trim() || "";
    const jobLocation = job.location?.toLowerCase().trim() || "";
    const jobTitle = job.title?.toLowerCase().trim() || "";

    // Normalize selected filters
    const selectedCategoriesNormalized = selectedCategories.map(c => c.toLowerCase().trim());
    const selectedLocationsNormalized = selectedLocations.map(l => l.toLowerCase().trim());

    // Category match (checkbox)
    const matchesCategory =
      selectedCategoriesNormalized.length === 0 ||
      selectedCategoriesNormalized.includes(jobCategory);

    // Location match (checkbox)
    const matchesLocation =
      selectedLocationsNormalized.length === 0 ||
      selectedLocationsNormalized.includes(jobLocation);

    // Search input (matches title OR category OR location)
    const matchesSearchInput =
      searchFilter.title === "" ||
      jobTitle.includes(searchFilter.title.toLowerCase().trim()) ||
      jobCategory.includes(searchFilter.title.toLowerCase().trim()) ||
      jobLocation.includes(searchFilter.title.toLowerCase().trim());

    // Location search input (extra check from your original code)
    const matchesSearchLocation =
      searchFilter.location === "" ||
      jobLocation.includes(searchFilter.location.toLowerCase().trim());

    return matchesCategory && matchesLocation && matchesSearchInput && matchesSearchLocation;
  });

  setFilteredJobs(newFilteredJobs);
  setCurrentPage(1);
}, [jobs, selectedCategories, selectedLocations, searchFilter]);


  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
      
      {/* Sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4'>

        {/* Search Filter (from Header) */}
        {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
          <>
            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
            <div className='mb-4 text-gray-600'>
              {searchFilter.title && (
                <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5'>
                  {searchFilter.title}
                  <img
                    onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                    className='cursor-pointer h-6'
                    src={assets.crossIcon}
                    alt="Remove title filter"
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5'>
                  {searchFilter.location}
                  <img
                    onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                    className='cursor-pointer h-6'
                    src={assets.crossIcon}
                    alt="Remove location filter"
                  />
                </span>
              )}
            </div>
          </>
        )}

        {/* Filter Toggle for Mobile */}
        <button
          onClick={() => setShowFilter(prev => !prev)}
          className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        {/* Category Filter */}
        <div className={`${showFilter ? '' : 'max-lg:hidden'} bg-white p-6 rounded-xl shadow-md`}>
          <h4 className="font-semibold text-xl text-gray-800 mb-6 border-b pb-2">Search by Categories</h4>
          <ul className="space-y-4 text-gray-700">
            {jobCategories.map((category, index) => (
              <li
                key={index}
                className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="accent-blue-600 w-5 h-5"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter */}
        <div className={`${showFilter ? '' : 'max-lg:hidden'} bg-white p-6 rounded-xl shadow-md mt-4`}>
          <h4 className="font-semibold text-xl text-gray-800 mb-6 border-b pb-2">Search by Location</h4>
          <ul className="space-y-4 text-gray-700">
            {jobLocations.map((location, index) => (
              <li
                key={index}
                className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="accent-blue-600 w-5 h-5"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocations.includes(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Job Listing Section */}
      <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
        <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Internships</h3>
        <p className='mb-8'>Get your desired internships from top companies</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
          {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className='flex items-center justify-center space-x-2 mt-10'>
            {/* Previous */}
            <a href="#job-list">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                className='h-4'
                src={assets.leftArrow}
                alt="Previous page"
              />
            </a>

            {/* Page Numbers */}
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
              <a key={index} href="#job-list">
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
                >
                  {index + 1}
                </button>
              </a>
            ))}

            {/* Next */}
            <a href="#job-list">
              <img
                onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))}
                className='h-6'
                src={assets.rightArrow}
                alt="Next page"
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
