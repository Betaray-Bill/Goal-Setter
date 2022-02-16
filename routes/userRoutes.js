const express = require('express');
const { register, login, getMe } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router()

router.post('/', register)
router.post('/login', login)
router.get('/me', protect, getMe)

module.exports = router