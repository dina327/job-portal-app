
import JobApplication from "../models/JobApplications.js"
import User from "../models/User.js"
import { v2 as cloudinary} from "cloudinary"


// // Generate JWT token
// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// // ✅ Signup
// export const signupUser = async (req, res) => {
//   try {
//     const { name, email, image } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ success: false, message: "User already exists" });
//     }

//     const newUser = await User.create({ name, email, image });
//     const token = generateToken(newUser._id);

//     return res.json({ success: true, user: newUser, token });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

// // ✅ Login
// export const loginUser = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     const token = generateToken(user._id);
//     return res.json({ success: true, user, token });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };



// ... your applyForJob, getUserJobApplications, updateUserResume remain unchanged

//get user data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const user = await User.findOne({ _id: userId }); // ✅ works with string _id
    if (!user) {
      return res.json({ success: false, message: 'User Not Found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//apply for a job
export const applyForJob=async(req,res)=>{
    const {jobId}=req.body
    const userId=req.auth.userId
    try{
        //to check if the user already applied or not
      const isAlreadyApplied=await JobApplication.find({jobId,userId}) 
      if(isAlreadyApplied.length>0){
        return res.json({success:false,message:'Already applied'})
      }
      const jobData=await Job.findById(jobId)
      if(!jobData){
        returnres.json({success:flalse, message:'Job Not Found'})
      }
       await JobApplication.create({
        companyId:jobData.companyId,
        userId,
        jobId,
        date:Date.now()
       })
       res.json({success:true, message:'Applied Successfully'})

    }catch(error){
         res.json({success:false,message:error.message})

    }
}
//get user applied applications
export const getUserJobApplications=async(req,res)=>{
    try{
        const userId=req.auth.userId
        const application=await JobApplication.find({userId})
        .populate('companyId','name email image')
        .populate('jobId','title description location category level salary')
        .exec()
        if(!applications){
            return res.json({success:false,message:'No job applications found for this user.'})
        
    }
    return res.json({success:true,applications})
    }catch(error){
        res.json({success:false,message:error.message})
    }
    
}
//update user profile(resume)
export const updateUserResume=async(req,res)=>{
    try {
        const userId=req.auth.userId
        const resumeFile=req.file
        const userData=await User.findById(userId)
        if(resumeFile){
            const resumeUpload=await cloudinary.uploader.upload(resumeFile.path)
            userData.resume=resumeUpload.secure_url
            console.log(req.file)
        }
        await userData.save()
        return res.json({success:true,message:'Resume Updated'})
        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
    
}