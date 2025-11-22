import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from '../components/JobCard';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

const ApplyJobs = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const { jobs, backendurl, userData, userApplications, fetchUserApplications } =
    useContext(AppContext);

  // Fetch single job
  const fetchJob = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/jobs/${id}`);
      if (data.success) setJobData(data.job);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Apply handler
  const applyHandler = async () => {
    if (!userData) return toast.error('Login to apply for jobs');
    if (!userData.resume) {
      navigate('/applications');
      return toast.error('Upload resume to apply');
    }
    if (!jobData?._id) return toast.error('Job not found');

    if (moment().isAfter(moment(jobData.applicationDeadline))) {
      return toast.error('Application deadline has passed');
    }

    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendurl}/api/users/apply`,
        { jobId: jobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Check if user already applied
  const checkAlreadyApplied = () => {
    if (!jobData?._id) return;
    const applied = userApplications.some(
      (app) => app.jobId?._id === jobData._id
    );
    setIsAlreadyApplied(applied);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    if (jobData && userApplications.length > 0) checkAlreadyApplied();
  }, [jobData, userApplications]);

  const isDeadlinePassed = jobData && moment().isAfter(moment(jobData.applicationDeadline));

  return jobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg w-full">
          {/* Job header */}
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border"
                src={jobData?.companyId?.image || assets.defaultCompany}
                alt={jobData?.companyId?.name || 'Company'}
              />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-medium">{jobData?.title}</h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <img className="h-8" src={assets.suitcaseIcon} alt="" />
                    {jobData?.companyId?.name || 'Unknown Company'}
                  </span>
                  <span className="flex items-center gap-1">
                    <img className="h-6" src={assets.locationIcon} alt="" />
                    {jobData?.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img className="h-6" src={assets.personIcon} alt="" />
                    {jobData?.internshipType}
                  </span>
                  <span className="flex items-center gap-1">
                    <img className="h-6" src={assets.moneyIcon} alt="" />
                    {jobData?.paymentType === 'Paid'
                      ? `Paid: ${kconvert.convertTo(jobData.paymentAmount)}`
                      : 'Unpaid'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button
                onClick={applyHandler}
                disabled={isAlreadyApplied || isDeadlinePassed}
                className={`${
                  isAlreadyApplied || isDeadlinePassed
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600'
                } p-2.5 px-10 text-white rounded`}
              >
                {isAlreadyApplied
                  ? 'Already Applied'
                  : isDeadlinePassed
                  ? 'Deadline Passed'
                  : 'Apply Now'}
              </button>

              <p className="mt-1 text-gray-600">
                Posted {moment(jobData?.datePosted).fromNow()}
              </p>
              <p className="mt-1 text-gray-600">
                Deadline: {moment(jobData?.applicationDeadline).format('MMMM Do YYYY')} (
                {isDeadlinePassed
                  ? 'Closed'
                  : `${moment(jobData?.applicationDeadline).diff(moment(), 'days')} days left`}
                )
              </p>
            </div>
          </div>

          {/* Job details + sidebar */}
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4">Job description</h2>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: jobData?.description }}
              ></div>
              <button
                onClick={applyHandler}
                disabled={isAlreadyApplied || isDeadlinePassed}
                className={`${
                  isAlreadyApplied || isDeadlinePassed
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600'
                } p-2.5 px-10 text-white rounded mt-4`}
              >
                {isAlreadyApplied
                  ? 'Already Applied'
                  : isDeadlinePassed
                  ? 'Deadline Passed'
                  : 'Apply Now'}
              </button>
            </div>

            {/* More jobs */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
              <h2>More jobs from {jobData?.companyId?.name || 'this company'}</h2>
              {jobs
                .filter((job) => {
                  const appliedJobsIds = new Set(
                    userApplications.map((app) => app.jobId && app.jobId._id)
                  );
                  return (
                    job.companyId?._id === jobData?.companyId?._id &&
                    job._id !== jobData._id &&
                    !appliedJobsIds.has(job._id)
                  );
                })
                .slice(0, 4)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJobs;
