import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Convert MongoDB _id to creation date
  const getCreatedAtFromId = (id) => {
    return new Date(parseInt(id.substring(0, 8), 16) * 1000);
  };

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/companies`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setCompanies(data.companies);
      } else {
        toast.error(data.message || "Failed to fetch companies");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Companies List</h1>
      
      {loading ? (
        <p className="text-gray-500">Loading companies...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Logo</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, idx) => (
                <tr key={company._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{idx + 1}</td>
                  <td className="px-6 py-3">
                    <img src={company.image} alt={company.name} className="w-12 h-12 rounded-full" />
                  </td>
                  <td className="px-6 py-3">{company.name}</td>
                  <td className="px-6 py-3">{company.email}</td>
                  <td className="px-6 py-3">
                    {getCreatedAtFromId(company._id).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
