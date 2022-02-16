const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const User = require("../models/userModel")

const protect = asyncHandler(async(req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from token
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (err) {
            console.log(err)
            res.status(401)
            throw new Error("Not authorizated")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Not authorizated, no token")
    }
})


module.exports = { protect }