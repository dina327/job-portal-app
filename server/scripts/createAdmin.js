// scripts/createAdmin.js
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import 'dotenv/config';

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const adminExists = await Admin.findOne({ email: 'admin@jobportal.com' });
        if (adminExists) {
            console.log('⚠️ Admin already exists');
            process.exit(0);
        }

        const admin = new Admin({
            name: 'Super Admin',
            email: 'admin@gmail.com',
            password: 'admin123' // Change this after first login!
        });

        await admin.save();
        console.log('✅ Admin created successfully!');
        console.log('Email: admin@jobportal.com');
        console.log('Password: admin123');
        console.log('⚠️ Change the password after first login!');
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();