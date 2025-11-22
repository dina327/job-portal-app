// middleware/adminAuth.js
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protectAdmin = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Not authorized, no token' 
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            const admin = await Admin.findById(decoded.id).select('-password');
            if (!admin) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Not authorized as admin' 
                });
            }

            req.admin = admin;
            next();
        } catch (error) {
            return res.status(401).json({ 
                success: false, 
                message: 'Not authorized, token failed' 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Server error in authentication' 
        });
    }
};