const express = require('express')
const { getGoals, setGoals, updateGoal, deleteGoal } = require('../controllers/goalControllers')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/', protect, getGoals)

router.post('/', protect, setGoals)

router.put('/:id', protect, updateGoal)

router.delete('/:id', protect, deleteGoal)

module.exports = router