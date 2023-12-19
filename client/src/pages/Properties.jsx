import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropertyTable from "../components/MultiProperty/PropertyTable";
import { fetchUserProperties } from "../features/api/dbSlice";
import { Box, Stack } from "@mui/material";

import PageHeader from "../components/General/PageHeader";

/**
 * Properties component for displaying user's saved leads.
 * Fetches user properties based on property types (Absentee Owner, Foreclosure, Probate).
 * @returns {JSX.Element} - Rendered Properties component.
 */
function Properties() {
	// Hook to navigate to different routes
	const navigate = useNavigate();
	// Get user data from Redux store
	const { user } = useSelector((state) => state.auth);
	// Local state to store user properties
	const [properties, setProperties] = useState([]);
	// Redux dispatch function
	const dispatch = useDispatch();

	// Redirect to login page if user is not authenticated
	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

	// Fetch user properties when the component mounts or user changes
	useEffect(() => {
		if (user) {
			// Fetch user properties using the user's ID
			dispatch(fetchUserProperties(user._id))
				.unwrap()
				.then((response) => {
					// Update the properties state with the fetched data
					setProperties(response);
					console.log("ALL OF THE USER PROPERTIES: ", response);
				})
				.catch((error) => {
					// Handle any errors, e.g., show an error message
					console.error("Error fetching user properties:", error);
				});
		}
	}, [user, dispatch]);

	// Render the Properties component
	return (
		<Box m="1.5rem 2.5rem">
			{/* Page header with title and subtitle */}
			<PageHeader title="Saved Leads" subtitle="" />

			{/* Stack layout for property tables */}
			<Stack spacing={2}>
				{properties.filter(
					(property) => property.PropertyType === "Absentee Owner"
				) && (
					<PropertyTable
						properties={properties.filter(
							(property) =>
								property.PropertyType === "Absentee Owner"
						)}
						name="Absentee Owner"
					/>
				)}

				{properties.filter(
					(property) => property.PropertyType === "Foreclosure"
				) && (
					<PropertyTable
						properties={properties.filter(
							(property) =>
								property.PropertyType === "Foreclosure"
						)}
						name="Foreclosure"
					/>
				)}

				{properties && (
					<PropertyTable
						properties={properties.filter(
							(property) => property.PropertyType === "Probate"
						)}
						name={"Probate"}
					/>
				)}
			</Stack>
		</Box>
	);
}

export default Properties;
