const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];


            console.log('Token', token);
            console.log('JWT TOKEN', process.env.JWT_SECRET);
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get User from token
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                throw new Error('User not found');
            }

            next();
        } catch (error) {
            console.error('Error verifying token:', error); // Log the error
            res.status(401);
            throw new Error('Not Authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not Authorized - No Token');
    }
});

module.exports = { protect };
