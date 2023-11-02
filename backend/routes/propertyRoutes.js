const express = require('express')
const router = express.Router()
//const { registerUser, loginUser, logout, getUser } = require('../controllers/userController')
const {protect} = require('../middleware/authorization')
const { getUserProperties, getProperties, isUserProperty, addUserProperty, removeUserProperty } = require('../controllers/propertyController')



router.get('/', getProperties)
router.get('/:userId', getUserProperties)
router.get('/check', isUserProperty)
router.post('/:userId', addUserProperty)
router.delete('/:userId', removeUserProperty)
//router.get('/logout', logout)

module.exports = router