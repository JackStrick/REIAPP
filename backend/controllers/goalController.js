const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//  @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

//  @desc Set Goals
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

//  @desc Update Goals
// @route PUT /api/goals
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal Not Found')
    }

    const user = await User.findById(req.user.id)

    // Check if user exists
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure logged in user mathches goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User Not Authorized')
    }


    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })


    res.status(200).json(updatedGoal)
})

//  @desc Delete Goal
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal Not Found')
    }

    const user = await User.findById(req.user.id)

    // Check if user exists
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure logged in user mathches goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User Not Authorized')
    }

    await goal.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals, 
    setGoal,
    updateGoal,
    deleteGoal
}