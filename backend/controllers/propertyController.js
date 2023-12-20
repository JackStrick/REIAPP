const { default: mongoose } = require("mongoose");
const Property = require("../models/propertyModel");
const Analytics = require("../models/propertyAnalyticsModel");
const UserProperties = require("../models/userPropertiesModel");

/**
 * Get all properties from the database.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the fetched properties or an error message.
 * @route POST /api/users/login
 * @access Public
 */
const getProperties = async (req, res) => {
	try {
		// Attempt to fetch all properties from the database
		const properties = await Property.find({});
		res.status(200).json(properties);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

/**
 * Get a property by its ID.
 * @function
 * @async
 * @param {Object} req - Express request object with propertyId as a parameter.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the fetched property or an error message.
 * @route GET /api/properties/:propertyId
 * @access Public
 */
const getPropertyById = async (req, res) => {
	const propertyId = req.params.propertyId;

	try {
		// Attempt to fetch the property with the given ID from the database
		const property = await Property.findById(propertyId);

		res.status(200).json(property);
		//console.log(property); // Log the retrieved property to the console
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

/**
 * Get property analytics by ZPID.
 * @function
 * @async
 * @param {Object} req - Express request object with zpid as a parameter.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the fetched property analytics or an error message.
 * @route GET /api/property-analytics/:zpid
 * @access Public
 */
const getPropertyAnalytics = async (req, res) => {
	const zpid = req.params.zpid;

	try {
		const analytics = await Analytics.find({ zpid: zpid });
		res.status(200).json(analytics);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

/**
 * Get properties associated with a user.
 * @function
 * @async
 * @param {Object} req - Express request object with userId as a parameter.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the fetched user properties or an error message.
 * @route GET /api/user-properties/:userId
 * @access Public
 */
const getUserProperties = async (req, res) => {
	const userId = req.params.userId;
	try {
		// Retrieve property IDs associated with the user from the user_properties table
		const userPropertyIds = await UserProperties.find(
			{ userId: userId },
			"propertyId"
		);

		if (!userPropertyIds) {
			// Handle the case where no data was found
			return res
				.status(404)
				.json({ message: "No data found for the given userId" });
		}

		// Extract property IDs from the results
		const propertyIds = userPropertyIds.map(
			(userProperty) => userProperty.propertyId
		);

		// Fetch property data for the retrieved property IDs from the Property model
		const properties = await Property.find({ _id: { $in: propertyIds } });

		res.status(200).json(properties);
	} catch (error) {
		console.error("Error fetching user properties:", error);
		res.status(500).json({ message: error.message });
	}
};

/**
 * Check if a user property record already exists.
 * @function
 * @async
 * @param {Object} req - Express request object with userId and propertyId as parameters.
 * @param {Object} res - Express response object.
 * @returns {Boolean} - True if a user property record exists, false otherwise.
 * @route GET /api/is-user-property/:userId/:propertyId
 * @access Public
 */
const isUserProperty = async (req, res) => {
	const { userId, propertyId } = req.params;

	try {
		// Check if a user property record already exists for this user and property
		const existingUserProperty = await UserProperties.findOne({
			userId: userId,
			propertyId: propertyId,
		});

		if (existingUserProperty) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error("Error checking user property:", error);
		return res
			.status(500)
			.json({ message: "Error checking user property" });
	}
};

/**
 * Add a user property record.
 * @function
 * @async
 * @param {Object} req - Express request object with userId and propertyId as parameters.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 * @route POST /api/add-user-property/:userId/:propertyId
 * @access Public
 */
const addUserProperty = async (req, res) => {
	const { userId, propertyId } = req.params;

	try {
		// Check if a user property record already exists for this user and property
		const exists = await isUserProperty(req, res);
		if (exists) {
			return res
				.status(303)
				.json({ message: "User property record already exists" });
		}

		// If no record exists, create a new user property record
		const newUserProperty = new UserProperties({ userId, propertyId });

		await newUserProperty.save();

		return res
			.status(201)
			.json({ message: "User property record created successfully" });
	} catch (error) {
		console.error("Error adding user property:", error);
		return res.status(500).json({ message: "Error adding user property" });
	}
};

/**
 * Remove a user property record.
 * @function
 * @async
 * @param {Object} req - Express request object with userId and propertyId as parameters.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure.
 * @route DELETE /api/remove-user-property/:userId/:propertyId
 * @access Public
 */
const removeUserProperty = async (req, res) => {
	const { userId, propertyId } = req.params;

	try {
		// Find and delete the user property record that matches the provided user and property IDs
		const deletedUserProperty = await UserProperties.deleteOne({
			userId,
			propertyId,
		});

		if (deletedUserProperty.deletedCount === 0) {
			return res
				.status(404)
				.json({ message: "User property record not found" });
		}

		return res
			.status(200)
			.json({ message: "User property record deleted successfully" });
	} catch (error) {
		console.error("Error removing user property:", error);
		return res
			.status(500)
			.json({ message: "Error removing user property" });
	}
};

// Export the getProperties function to make it available for use in routes
module.exports = {
	getProperties,
	getPropertyAnalytics,
	getPropertyById,
	getUserProperties,
	isUserProperty,
	addUserProperty,
	removeUserProperty,
};
