const express = require("express");
const router = express.Router();
//const { registerUser, loginUser, logout, getUser } = require('../controllers/userController')
const { protect } = require("../middleware/authorization");
const {
	getUserProperties,
	getProperties,
	getPropertyById,
	getPropertyAnalytics,
	isUserProperty,
	addUserProperty,
	removeUserProperty,
} = require("../controllers/propertyController");

router.get("/", getProperties);
router.get("/:propertyId", getPropertyById);
router.get("/analytics/:zpid", getPropertyAnalytics);
router.get("/user_properties/:userId", getUserProperties);
router.get("/user_properties/:userId/:propertyId", isUserProperty);
router.post("/user_properties/:userId/:propertyId", addUserProperty);
router.delete("/user_properties/:userId/:propertyId", removeUserProperty);

//router.get('/logout', logout)

module.exports = router;
