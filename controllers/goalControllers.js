const asyncHandler = require('express-async-handler');
const Goal = require("../models/goalModel")
const User = require("../models/userModel")

// @desc Get goals
// @route GET /api/goals
// Access Private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    console.log("ghf")
    res.status(200).json(goals)
})

// @desc Set goals
// @route POST /api/goals
// Access Private
const setGoals = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a text")
    }

    try {
        const goal = await goal({
            text: req.body.text,
            user: req.user.id
        })
    } catch (err) {
        console.log(err.message)
    }

    res.status(200).json({ message: "posted goal" })
})

// @desc Updated goals
// @route PUT /api/goals/:id
// Access Private
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }
    const user = await User.find(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }
    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedGoal)
})

// @desc delete goals
// @route GET /api/goals/:id
// Access Private
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const deleteGoal = await Goal.findByIdAndRemove(req.params.id)

    res.status(200).json(deleteGoal)
})

module.exports = { getGoals, updateGoal, deleteGoal, setGoals }