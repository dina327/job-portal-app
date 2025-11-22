import React, { useContext, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { assets, jobCategories, jobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

function AddJob() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Megenagna');
  const [category, setCategory] = useState('programming');

  const [internshipType, setInternshipType] = useState('On-site');
  const [paymentType, setPaymentType] = useState('Unpaid'); // renamed
  const [paymentAmount, setPaymentAmount] = useState('');    // renamed

  const [duration, setDuration] = useState('');
  const [deadline, setDeadline] = useState('');

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendurl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const description = quillRef.current.root.innerHTML;

      // If internship is Paid, payment amount becomes required
      if (paymentType === "Paid" && !paymentAmount) {
        toast.error("Please enter the payment amount.");
        return;
      }

      const { data } = await axios.post(
        backendurl + '/api/company/post-job',
        {
          title,
          description,
          location,
          category,

          internshipType,
          paymentType,
          paymentAmount:
            paymentType === "Paid" ? Number(paymentAmount) : 0,

          duration,
         applicationDeadline: new Date(deadline)
        },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setTitle('');
        setDuration('');
        setDeadline('');
        setPaymentAmount('');
        quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className='container p-4 flex flex-col w-full items-start gap-3'
    >
      {/* Internship Title */}
      <div className='w-full'>
        <p className='mb-2'>Internship Title</p>
        <input
          type="text"
          placeholder='Type here'
          onChange={e => setTitle(e.target.value)}
          value={title}
          required
          className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
        />
      </div>

      {/* Description */}
      <div className='w-full max-w-lg'>
        <p className='my-2'>Internship Description</p>
        <div ref={editorRef}></div>
      </div>

      {/* Category + Location + Internship Type */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        {/* Category */}
        <div>
          <p className='mb-2'>Category</p>
          <select
            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
            onChange={e => setCategory(e.target.value)}
            value={category}
          >
            {jobCategories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <p className='mb-2'>Location</p>
          <select
            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
            onChange={e => setLocation(e.target.value)}
            value={location}
          >
            {jobLocations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Internship Type */}
        <div>
          <p className='mb-2'>Internship Type</p>
          <select
            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
            value={internshipType}
            onChange={e => setInternshipType(e.target.value)}
          >
            <option value="On-site">On-site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Payment Type */}
      <div className='flex flex-col sm:flex-row gap-6'>
        <div>
          <p className='mb-2'>Payment Type</p>
          <select
            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
            value={paymentType}
            onChange={e => { 
              setPaymentType(e.target.value); 
              if (e.target.value === "Unpaid") setPaymentAmount('');
            }}
          >
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        {/* Payment Amount */}
        {paymentType === "Paid" && (
          <div>
            <p className='mb-2'>Payment Amount</p>
            <input
              type="number"
              min="0"
              placeholder='1000'
              value={paymentAmount}
              onChange={e => setPaymentAmount(e.target.value)}
              className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]'
            />
          </div>
        )}
      </div>

      {/* Duration */}
      <div>
        <p className='mb-2'>Duration</p>
        <input
          type="text"
          placeholder='e.g., 2 months'
          value={duration}
          onChange={e => setDuration(e.target.value)}
          required
          className='w-full px-3 py-2 border-2 border-gray-300 rounded'
        />
      </div>

      {/* Application Deadline */}
      <div>
        <p className='mb-2'>Application Deadline</p>
        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          required
          className='w-full px-3 py-2 border-2 border-gray-300 rounded'
        />
      </div>

      <button className='w-28 py-3 mt-4 bg-black text-white rounded'>ADD</button>
    </form>
  );
}

export default AddJob;
