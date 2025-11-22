// controllers/adminController.js
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import User from '../models/User.js';
import JobApplication from '../models/JobApplications.js';

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Admin Login
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        res.json({
            success: true,
            token: generateToken(admin._id),
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get Dashboard Stats
export const getDashboardStats = async (req, res) => {
    try {
        const totalCompanies = await Company.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalApplications = await JobApplication.countDocuments();
       

        res.json({
            success: true,
            stats: {
                totalCompanies,
                totalJobs,
                totalUsers,
                totalApplications,
               
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get All Companies
export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find().select('-password').sort({ createdAt: -1 });
        
        res.json({
            success: true,
            companies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get All Jobs with Filters
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find() // fetch all jobs
      .populate('companyId', 'name email image') // include company info
      .sort({ createdAt: -1 }); // newest first

    res.json({
      success: true,
      jobs,
      total: jobs.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Toggle Job Visibility
export const toggleJobVisibility = async (req, res) => {
    try {
        const { jobId } = req.body;
        
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        job.visible = !job.visible;
        await job.save();

        res.json({
            success: true,
            job,
            message: `Job ${job.visible ? 'visible' : 'hidden'} successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        
        res.json({
            success: true,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get All Applications
export const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find()
      .populate({
        path: "userId",
        select: "name email image"
      })
      .populate({
        path: "jobId",
        populate: {
          path: "companyId",
          select: "name"
        },
        select: "title companyId"
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
