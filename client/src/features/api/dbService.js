import axios from 'axios';

const API_URL = '/api/property/'

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Define your API endpoints
const dbService = {
  // Register Property (Example)
  registerProperty: async (propertyData) => {
    try {
      const response = await axiosInstance.post('', propertyData);

      // Store data in local storage (example)
      if (response.data) {
        // Customize the local storage data storage as needed
        localStorage.setItem('property', JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fetch Properties
  getProperties: async () => {
    try {
        const response = await axiosInstance.get();
        console.log(response.status);
        if (response.status === 200) {
            //console.log('Fetched properties:', response.data);
            // Assuming the data is returned as an array, you can store it directly
            const propertyData = response.data;

            // Store data in local storage (example)
            if (propertyData) {
            // Customize the local storage data storage as needed
            localStorage.setItem('properties', JSON.stringify(propertyData));
            }
            //console.log('dbService Returning property data', propertyData)
            return propertyData;
        } else {
            // Handle non-200 status codes, if needed
            throw new Error(`Request failed with status: ${response.status}`);
        }
        } catch (error) {
        // Handle and log errors
        console.error('Error fetching properties:', error);
        throw error;
    }
  },
  

  // Add more methods for other API endpoints as needed
};

export default dbService
