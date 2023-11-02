// Import the Property model, which represents properties in the database
const { default: mongoose } = require('mongoose');
const Property = require('../models/propertyModel');
const UserProperties = require('../models/userPropertiesModel');

// Define a controller function to get properties
const getProperties = async (req, res) => {
    //console.log("MADE IT HERE"); // Log a message indicating that the function has been reached

    try {
        // Attempt to fetch all properties from the database
        const properties = await Property.find({});

        // If the database query is successful, respond with a status code of 200 (OK)
        // and send the retrieved properties as a JSON response
        res.status(200).json(properties);
        //console.log(properties); // Log the retrieved properties to the console
    } catch (error) {
        // If there's an error (e.g., a database query error), catch it here
        // Respond with a status code of 404 (Not Found) and send an error message as a JSON response
        res.status(404).json({ message: error.message });
        console.log("DIDNT WORK"); // Log a message indicating that the operation didn't work
    }
}

const getUserProperties = async (req, res) => {
    const userId = req.params.userId;
    console.log("MADE IT HERE"); // Log a message indicating that the function has been reached
    console.log("Received userId:", userId);

    try {
        // Retrieve property IDs associated with the user from the user_properties table
        const userPropertyIds = await UserProperties.find({ userId: userId }, 'propertyId');
        console.log("userPropertyIds:", userPropertyIds);

        if (!userPropertyIds) {
            // Handle the case where no data was found
            return res.status(404).json({ message: 'No data found for the given userId' });
        }
    
        // Extract property IDs from the results
        const propertyIds = userPropertyIds.map((userProperty) => userProperty.propertyId);
     
    
        // Fetch property data for the retrieved property IDs from the Property model
        const properties = await Property.find({ _id: { $in: propertyIds } });
      
    
        // Respond with a status code of 200 and send the retrieved properties as a JSON response
        res.status(200).json(properties);
    } catch (error) {
        // Handle any errors and respond with an appropriate status code and error message
        console.error("Error fetching user properties:", error);
        res.status(500).json({ message: error.message });
    }
};

const isUserProperty = async (req, res) => {
    const { userId, propertyId } = req.body;
    try {
        // Check if a user property record already exists for this user and property
        const existingUserProperty = await UserProperty.findOne({ userId: userId, propertyId: propertyId });
    
        if (existingUserProperty) {
            //res.status(400).json({ message: 'User property record already exists' });
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.error('Error checkin user property:', error);
        return res.status(500).json({ message: 'Error checking user property' });
      }
};

const addUserProperty = async (req, res) => {
    const { userId, propertyId } = req.body;
    try {
        if (isUserProperty) {
          return res.status(400).json({ message: 'User property record already exists' });
        }
    
        // If no record exists, create a new user property record
        const newUserProperty = new UserProperty({ userId, propertyId });
    
        await newUserProperty.save();
    
        return res.status(201).json({ message: 'User property record created successfully' });
      } catch (error) {
        console.error('Error adding user property:', error);
        return res.status(500).json({ message: 'Error adding user property' });
      }
};

const removeUserProperty = async (req, res) => {
    const { userId, propertyId } = req.body; // Assuming you send the user ID and property ID in the request body
  
    try {
      // Find and delete the user property record that matches the provided user and property IDs
      const deletedUserProperty = await UserProperty.deleteOne({ userId, propertyId });
  
      if (deletedUserProperty.deletedCount === 0) {
        return res.status(404).json({ message: 'User property record not found' });
      }
  
      return res.status(200).json({ message: 'User property record deleted successfully' });
    } catch (error) {
      console.error('Error removing user property:', error);
      return res.status(500).json({ message: 'Error removing user property' });
    }
  };
  


// Export the getProperties function to make it available for use in routes
module.exports = {
    getProperties,
    getUserProperties,
    isUserProperty,
    addUserProperty,
    removeUserProperty
}
