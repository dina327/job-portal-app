import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { setShowAdminLogin, setAdminToken, setAdminData } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);

  const loginAdmin = async (email, password) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (data.success) {
        

        // Save token & update context
        localStorage.setItem('adminToken', data.token);
        setAdminToken(data.token);
        setAdminData(data.admin); // optional if you return admin info

        // Redirect to dashboard
        navigate('/admin-dashboard/stats');

        // Hide modal
        setShowAdminLogin(false);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in both fields');
      return;
    }

    setLoading(true);
    await loginAdmin(email, password);
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center"
      onClick={() => setShowAdminLogin(false)}
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-[90%] max-w-sm shadow-xl"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium mb-1">Admin Login</h1>
        <p className="text-sm text-center mb-6">Welcome back! Please sign in to continue</p>

        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-4">
          <img className="w-5 h-5" src={assets.emailIcon} alt="email" />
          <input
            className="outline-none text-sm flex-1"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email address"
            required
          />
        </div>

        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-4">
          <img className="w-5 h-5" src={assets.lockicon} alt="lock" />
          <input
            className="outline-none text-sm flex-1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-6 hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <img
          onClick={() => setShowAdminLogin(false)}
          className="absolute top-5 right-5 cursor-pointer h-5 hover:scale-110 transition"
          src={assets.crossIcon}
          alt="close"
        />
      </form>
    </div>
  );
};

export default AdminLogin;
