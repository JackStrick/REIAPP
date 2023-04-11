const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logout, getUser } = require('../controllers/userController')
const {protect} = require('../middleware/authorization')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect , getUser)
router.get('/logout', logout)

module.exports = router