import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser();
  const { getToken } = useAuth();

  // ==================== Recruiter / User States ====================
  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  // ==================== ADMIN AUTH ====================
  // Initialize adminToken from localStorage on app start
  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem("adminToken") || null;
  });
  const [adminData, setAdminData] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // ==================== JOB FUNCTIONS ====================
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/jobs`);
      if (data.success) setJobs(data.jobs);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ==================== COMPANY FUNCTIONS ====================
  const fetchCompanyData = async () => {
    if (!companyToken) return;
    try {
      const { data } = await axios.get(`${backendurl}/api/company/company`, {
        headers: { token: companyToken },
      });
      if (data.success) setCompanyData(data.company);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ==================== USER FUNCTIONS (Clerk) ====================
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendurl}/api/users/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setUserData(data.user);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserApplications = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendurl}/api/users/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setUserApplications(data.applications);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ==================== ADMIN FUNCTIONS ====================
  const loginAdmin = async (email, password) => {
    try {
      const { data } = await axios.post(`${backendurl}/api/admin/login`, { email, password });
      if (data.success) {
        setAdminToken(data.token);
        setAdminData(data.admin);
        localStorage.setItem("adminToken", data.token); // Set localStorage immediately
        setShowAdminLogin(false);
        toast.success("Admin logged in successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin login failed");
    }
  };

  const logoutAdmin = () => {
    // Clear everything immediately
    setAdminToken(null);
    setAdminData(null);
    localStorage.removeItem("adminToken");
    // toast.info("Admin logged out");
  };

  const fetchAdminData = async () => {
    if (!adminToken) return;
    try {
      const { data } = await axios.get(`${backendurl}/api/admin/profile`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (data.success) setAdminData(data.admin);
    } catch (error) {
      console.error("Failed to fetch admin profile");
      // If token is invalid, logout
      logoutAdmin();
    }
  };

  // ==================== USE EFFECTS ====================
  useEffect(() => {
    fetchJobs();
    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) setCompanyToken(storedCompanyToken);
    
    // Fetch admin data if token exists on app start
    if (adminToken) {
      fetchAdminData();
    }
  }, []);

  useEffect(() => {
    if (companyToken) fetchCompanyData();
  }, [companyToken]);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [user]);

  // ==================== PROVIDER VALUE ====================
  const value = {
    backendurl,
    // Users / Recruiters
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    userData,
    setUserData,
    userApplications,
    fetchUserData,
    fetchUserApplications,
    // Admin
    adminToken,
    setAdminToken,
    adminData,
    setAdminData,
    showAdminLogin,
    setShowAdminLogin,
    loginAdmin,
    logoutAdmin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};