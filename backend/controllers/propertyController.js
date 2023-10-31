// Import the Property model, which represents properties in the database
const Property = require('../models/propertyModel');

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

// Export the getProperties function to make it available for use in routes
module.exports = {
    getProperties
}
