const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get token from header
            // [1] Gives just the token : Bearer djcvhsskcnssc
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, preocess.env.JWT_SECRET)

            // Get User from token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized - No Token')
    }
})

module.exports = {protect}