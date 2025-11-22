// pages/admin/JobsPage.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all jobs from backend
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        toast.error("Admin not logged in!");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/jobs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        toast.error("Unauthorized! Please login again.");
        setLoading(false);
        return;
      }

      if (data.success) {
        setJobs(data.jobs);
      } else {
        toast.error(data.message || "Failed to fetch jobs");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while fetching jobs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Convert MongoDB ObjectId to Date
  const getDateFromObjectId = (objectId) => {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Jobs Overview</h1>

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600">#</th>
                <th className="py-2 px-4 text-left text-gray-600">Title</th>
                <th className="py-2 px-4 text-left text-gray-600">Company</th>
                <th className="py-2 px-4 text-left text-gray-600">Status</th>
                <th className="py-2 px-4 text-left text-gray-600">Created At</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No jobs found
                  </td>
                </tr>
              ) : (
                jobs.map((job, index) => (
                  <tr key={job._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{job.title}</td>
                    <td className="py-2 px-4">{job.companyId?.name || "N/A"}</td>
                    <td className="py-2 px-4">
                      {job.visible ? (
                        <span className="text-green-600 font-medium">Visible</span>
                      ) : (
                        <span className="text-red-600 font-medium">Hidden</span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {getDateFromObjectId(job._id).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
