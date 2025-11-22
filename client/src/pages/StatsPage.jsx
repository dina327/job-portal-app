import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const StatsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // token from admin login
        const res = await axios.get(`${BACKEND_URL}/api/admin/dashboard`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (res.data.success) {
          setStats(res.data.stats);
        } else {
          setError("Failed to load stats");
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [BACKEND_URL]);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-600 text-lg">Loading stats...</div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-600 text-lg">{error}</div>
    );

  const data = [
    { name: "Companies", value: stats.totalCompanies },
    { name: "Jobs", value: stats.totalJobs },
    { name: "Users", value: stats.totalUsers },
    { name: "Applications", value: stats.totalApplications },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-800">Platform Statistics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg p-5 text-center">
          <h2 className="text-gray-500 text-sm font-medium">Companies</h2>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {stats.totalCompanies}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 text-center">
          <h2 className="text-gray-500 text-sm font-medium">Jobs</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {stats.totalJobs}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 text-center">
          <h2 className="text-gray-500 text-sm font-medium">Users</h2>
          <p className="text-2xl font-bold text-purple-600 mt-2">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 text-center">
          <h2 className="text-gray-500 text-sm font-medium">Applications</h2>
          <p className="text-2xl font-bold text-orange-600 mt-2">
            {stats.totalApplications}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Overview Chart
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
