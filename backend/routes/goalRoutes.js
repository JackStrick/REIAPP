const express = require('express')
const { set } = require('mongoose')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal,} = require('../controllers/goalController')
const { protect } = require('../middleware/authorization')


router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)


module.exports = router