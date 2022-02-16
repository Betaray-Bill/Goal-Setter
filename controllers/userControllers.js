const asyncHandler = require('express-async-handler');
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const register = asyncHandler(async(req, res) => {
    const { name, password, email } = req.body

    if (!name || !password || !email) {
        res.status(500)
        throw new Error("Please add all the fields")
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User({
        name,
        password: hashPassword,
        email
    })
    await user.save()

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid da")
    }

    res.json({ message: "USer registered" })
})


const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid da login layum")
    }
    res.json({ message: "USer logged In" })
})


const getMe = asyncHandler(async(req, res) => {
    const { _id, email, name } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = { register, login, getMe }