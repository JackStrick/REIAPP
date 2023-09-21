const express = require('express')
const router = express.Router()
//const { registerUser, loginUser, logout, getUser } = require('../controllers/userController')
const {protect} = require('../middleware/authorization')
const { getProperties } = require('../controllers/propertyController')


router.get('/', getProperties)
//router.get('/logout', logout)

module.exports = router