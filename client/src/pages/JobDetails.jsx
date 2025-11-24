import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const JobDetails = () => {
  const { backendurl } = useContext(AppContext);
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${backendurl}/api/jobs/${id}`);
        if (res.data.success) {
          setJob(res.data.job);
        } else {
          console.error(res.data.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, backendurl]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading job details...</p>;
  if (!job) return <p className="text-center mt-10 text-red-500">Job not found.</p>;

  return (
    <div className="container mx-auto my-10 p-6 md:p-12 bg-white rounded-2xl">
      {/* Job Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-8">
        <img
          src={job.companyId?.image || '/default-logo.png'}
          alt={job.companyId?.name}
          className="h-20 w-20 rounded-lg object-cover border"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
          <p className="text-gray-600 text-lg">{job.companyId?.name}</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
          <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <p className="text-gray-700"><strong>Level:</strong> {job.level}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-700"><strong>Category:</strong> {job.category}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="text-gray-700"><strong>Salary:</strong> {job.salary}</p>
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-lg max-w-none text-gray-700 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
        <div dangerouslySetInnerHTML={{ __html: job.description }} />
      </div>

      
      
    </div>
  );
};

export default JobDetails;
