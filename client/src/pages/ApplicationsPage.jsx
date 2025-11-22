import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        setApplications(data.applications);
      } else {
        toast.error(data.message || "Failed to fetch applications");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while fetching applications");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      Accepted: "bg-green-100 text-green-800 border-green-300",
      Rejected: "bg-red-100 text-red-800 border-red-300",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium border ${
          styles[status] || "bg-gray-100 text-gray-800 border-gray-300"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-5 text-center">
          <h2 className="text-gray-500 text-sm font-medium">Rejected Applications</h2>
          <p className="text-2xl font-bold text-red-600 mt-2">{applications.filter((app) => app.status === "Rejected").length}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 text-center">
          <h2 className="text-gray-500 text-sm font-medium">Pending Applications</h2>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            {applications.filter((app) => app.status === "Pending").length}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 text-center">
          <h2 className="text-gray-500 text-sm font-medium">Accepted Applications</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {applications.filter((app) => app.status === "Accepted").length}
          </p>
        </div>
      </div>

      {/* Applications Table */}
      {loading ? (
        <p>Loading applications...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600">#</th>
                <th className="py-2 px-4 text-left text-gray-600">Applicant</th>
                <th className="py-2 px-4 text-left text-gray-600">Email</th>
                <th className="py-2 px-4 text-left text-gray-600">Job Title</th>
                <th className="py-2 px-4 text-left text-gray-600">Company</th>
                <th className="py-2 px-4 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No applications found
                  </td>
                </tr>
              ) : (
                applications.map((app, index) => (
                  <tr key={app._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4 flex items-center gap-2">
                      <img
                        src={app.userId?.image}
                        alt={app.userId?.name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <span>{app.userId?.name || "Unknown"}</span>
                    </td>
                    <td className="py-2 px-4">{app.userId?.email || "N/A"}</td>
                    <td className="py-2 px-4 font-medium text-gray-700">{app.jobId?.title || "N/A"}</td>
                    <td className="py-2 px-4 text-gray-600">{app.jobId?.companyId?.name || "N/A"}</td>
                    <td className="py-2 px-4">{getStatusBadge(app.status)}</td>
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

export default ApplicationsPage;
