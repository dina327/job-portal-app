// routes/adminRoutes.js
import express from 'express';
import { 
    loginAdmin, 
    getDashboardStats, 
    getAllCompanies, 
    getAllJobs, 
    toggleJobVisibility, 
    getAllUsers, 
    getAllApplications 
} from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Admin authentication
router.post('/login', loginAdmin);

// Protected admin routes
router.get('/dashboard', protectAdmin, getDashboardStats);
router.get('/companies', protectAdmin, getAllCompanies);
router.get('/jobs', protectAdmin, getAllJobs);
router.post('/jobs/toggle-visibility', protectAdmin, toggleJobVisibility);
router.get('/users', protectAdmin, getAllUsers);
router.get('/applications', protectAdmin, getAllApplications);

export default router;