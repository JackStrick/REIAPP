import axios from "axios";

const API_URL = "/api/property/";

const axiosInstance = axios.create({
	baseURL: API_URL,
});

// Define your API endpoints
const dbService = {
	// Register Property (Example)
	registerProperty: async (propertyData) => {
		try {
			const response = await axiosInstance.post("", propertyData);

			// Store data in local storage (example)
			if (response.data) {
				// Customize the local storage data storage as needed
				localStorage.setItem("property", JSON.stringify(response.data));
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
			if (response.status === 200 || response.status === 201) {
				// Assuming the data is returned as an array, you can store it directly
				const propertyData = response.data;

				// Store data in local storage (example)
				if (propertyData) {
					// Customize the local storage data storage as needed
					localStorage.setItem(
						"properties",
						JSON.stringify(propertyData)
					);
				}
				//console.log('dbService Returning property data', propertyData)
				return propertyData;
			} else {
				// Handle non-200 status codes, if needed
				throw new Error(
					`Request failed with status: ${response.status}`
				);
			}
		} catch (error) {
			// Handle and log errors
			console.error("Error fetching properties:", error);
			throw error;
		}
	},

	getPropertyById: async (propertyId) => {
		try {
			const response = await axiosInstance.get(`/${propertyId}`);
			if (response.status === 200 || response.status === 201) {
				const propertyData = response.data;
				if (propertyData) {
					localStorage.setItem(
						"property",
						JSON.stringify(propertyData)
					);
				}
				return propertyData;
			} else {
				throw new Error(
					`Request failed with status: ${response.status}`
				);
			}
		} catch (error) {
			console.error("Error fetching property:", error);
			throw error;
		}
	},

	getPropertyAnalytics: async (zpid) => {
		try {
			const response = await axiosInstance.get(`/analytics/${zpid}`);
			if (response.status === 200 || response.status === 201) {
				const propAnalytics = response.data;
				if (propAnalytics) {
					localStorage.setItem(
						"propertyAnalytics",
						JSON.stringify(propAnalytics)
					);
				}
				return propAnalytics;
			} else {
				throw new Error(
					`Request failed with status: ${response.status}`
				);
			}
		} catch (error) {
			console.error("Error fetching property analytics:", error);
			throw error;
		}
	},

	getUserProperties: async (userId) => {
		try {
			// Send a GET request to the user properties endpoint with the user ID
			const response = await axiosInstance.get(
				`/user_properties/${userId}`
			);
			if (response.status === 200 || response.status === 201) {
				const userPropertiesData = response.data;
				if (userPropertiesData) {
					localStorage.setItem(
						"user_properties",
						JSON.stringify(userPropertiesData)
					);
				}
				return userPropertiesData;
			} else {
				throw new Error(
					`Request failed with status: ${response.status}`
				);
			}
		} catch (error) {
			console.error("Error fetching user properties:", error);
			throw error;
		}
	},

	isUserProperty: async (userId, propertyId) => {
		try {
			// Send a GET request to the user properties endpoint with the user ID and property ID
			const response = await axiosInstance.get(
				`/user_properties/${userId}/${propertyId}`
			);
			if (response.status === 200) {
				const dbResponse = response.data;
				return dbResponse;
			} else {
				throw new Error(
					`Request failed with status: ${response.status}`
				);
			}
		} catch (error) {
			console.error("Error fetching user properties:", error);
			throw error;
		}
	},

	createUserProperty: async (userId, propertyId) => {
		try {
			// Send a GET request to the user properties endpoint with the user ID and property ID
			const response = await axiosInstance.post(
				`/user_properties/${userId}/${propertyId}`
			);
			if (response.status === 200 || response.status === 201) {
				const dbResponse = response.data;
				return dbResponse;
			} else {
				throw new Error(
					`Request failed with status: ${response.status}`
				);
			}
		} catch (error) {
			console.error("Error creating user properties:", error);
			throw error;
		}
	},

	deleteUserProperty: async (userId, propertyId) => {
		try {
			const response = await axiosInstance.delete(
				`/user_properties/${userId}/${propertyId}`
			);
			if (response.status === 200 || response.status === 201) {
				const dbResponse = response.data;
				return dbResponse;
			} else if (response.status === 303) {
				console.log("User property record already exists");
			} else {
				throw new Error(
					`Request failed with status: ${response.status}`
				);
			}
		} catch (error) {
			console.error("Error deleting user properties:", error);
			throw error;
		}
	},
};

export default dbService;
