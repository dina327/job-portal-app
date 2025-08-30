import { changeJobApplicationStatus, changeVisiblity, getCompanyData, getCompanyPostedJobs, loginCompany, postJob, registerCompany ,getCompanyJobApplicants} from "../controllers/companyController.js"
import express from 'express'
import upload from "../config/multer.js"
import { protectCompany } from "../middleware/authMiddleware.js"

const router=express.Router()
//register a company
router.post('/register',upload.single('image'),registerCompany)
//company login
router.post('/login',loginCompany)
//get company data
router.get('/company',protectCompany,getCompanyData)
//post a job
router.post('/post-job',protectCompany,postJob)
//get  applicants data of company
router.get('/applicants',protectCompany,getCompanyJobApplicants)
//get company job list
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)
//change applications status
router.post('/change-status',protectCompany,changeJobApplicationStatus)
//change application visbility
router.post('/change-visibility',protectCompany,changeVisiblity)
export default router