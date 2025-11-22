// pages/admin/UsersPage.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message || "Failed to fetch users");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while fetching users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Compute summary stats
  const totalUsers = users.length;
  const todayUsers = users.filter(user => {
    const today = new Date();
    const created = new Date(user.createdAt);
    return (
      created.getDate() === today.getDate() &&
      created.getMonth() === today.getMonth() &&
      created.getFullYear() === today.getFullYear()
    );
  }).length;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Users Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-5 text-center">
          <h2 className="text-gray-500 text-sm font-medium">Total Users</h2>
          <p className="text-2xl font-bold text-blue-600 mt-2">{totalUsers}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 text-center">
          <h2 className="text-gray-500 text-sm font-medium">Users Registered Today</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">{todayUsers}</p>
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600">#</th>
                <th className="py-2 px-4 text-left text-gray-600">Name</th>
                <th className="py-2 px-4 text-left text-gray-600">Email</th>
                {/* <th className="py-2 px-4 text-left text-gray-600">Registered At</th> */}
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4 flex items-center gap-2">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <span>{user.name}</span>
                    </td>
                    <td className="py-2 px-4">{user.email}</td>
                    {/* <td className="py-2 px-4">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td> */}
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

export default UsersPage;
