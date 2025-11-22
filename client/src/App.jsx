import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ApplyJobs from './pages/ApplyJobs';
import JobDetails from './pages/JobDetails';
import Applications from './pages/Applications';
import RecruiterLogin from './components/RecruiterLogin';
import AdminLogin from './components/AdminLogin';
import AddJob from './pages/AddJob';
import ViewApplications from './pages/ViewApplications';
import Dashboard from './pages/Dashboard';
import ManageJobs from './pages/ManageJobs';
import { AppContext } from './context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'quill/dist/quill.snow.css';
import StatsPage from './pages/StatsPage';
import AdminDashboard from './pages/AdminDashboard';
import CompaniesPage from './pages/CompaniesPage';
import JobsPage from './pages/JobsPage';
import UsersPage from './pages/UsersPage';
import ApplicationsPage from './pages/ApplicationsPage';

const App = () => {
  const { showRecruiterLogin, showAdminLogin, companyToken, adminData } = useContext(AppContext); // ✅ Use adminData instead of adminToken

  return (
    <div>
      {/* ✅ Recruiter Login Modal */}
      {showRecruiterLogin && <RecruiterLogin />}
      {showAdminLogin && <AdminLogin />} 

      <ToastContainer position="top-center" />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJobs />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/applications" element={<Applications />} />

        {/* Admin login modal route */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ✅ Fixed: Use adminData for route protection */}
        <Route path="/admin-dashboard"
          element={adminData ? <AdminDashboard /> : <Navigate to="/" replace />} // ✅ Redirect to home when no adminData
        >
          <Route index element={<Navigate to="stats" replace />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
        </Route>

        {/* ✅ Recruiter Dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
          {companyToken ? (
            <>
              <Route path="add-job" element={<AddJob />} />
              <Route path="manage-jobs" element={<ManageJobs />} />
              <Route path="view-applications" element={<ViewApplications />} />
            </>
          ) : null}
        </Route>
      </Routes>
    </div>
  );
};

export default App;