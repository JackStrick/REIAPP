import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropertyTable from "../components/MultiProperty/PropertyTable";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PageHeader from "../components/General/PageHeader";
import FlexBetween from "../components/Misc/FlexBetween";

/**
 * Leadfind component for finding potential properties for investment based on lead types.
 * Users can filter properties by lead types such as Absentee Owner, Foreclosure, and Probate.
 * @returns {JSX.Element} - Rendered Leadfind component.
 */
function Leadfind() {
	// Hook to navigate to different routes
	const navigate = useNavigate();
	// Get user data from Redux store
	const { user } = useSelector((state) => state.auth);
	// Local state to store selected lead type for filtering properties
	const [type, setType] = useState("All");

	// Handle lead type selection change
	const handleChange = (event) => {
		setType(event.target.value);
	};

	// Ensure user is authenticated, otherwise redirect to login
	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

	// Get properties from Redux store
	const fetchedProperties = useSelector((state) => state.db.properties);
	// Local state to store filtered properties
	const [properties, setProperties] = useState([]);

	// Update properties when fetched properties change
	useEffect(() => {
		setProperties(fetchedProperties);
	}, [fetchedProperties]);

	// Filter properties based on the selected lead type
	useEffect(() => {
		let filteredProperties = [...fetchedProperties];

		if (type === "Absentee") {
			filteredProperties = fetchedProperties.filter(
				(property) => property.PropertyType === "Absentee Owner"
			);
		} else if (type === "Foreclosure") {
			filteredProperties = fetchedProperties.filter(
				(property) => property.PropertyType === "Foreclosure"
			);
		} else if (type === "Probate") {
			filteredProperties = fetchedProperties.filter(
				(property) => property.PropertyType === "Probate"
			);
		}

		setProperties(filteredProperties);
	}, [type, fetchedProperties]);

	return (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				<PageHeader
					title="Lead-Find"
					subtitle="Find potential properties for investment"
				/>
				<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
					<InputLabel id="select-lead-type-small-label">
						Lead Type
					</InputLabel>
					<Select
						labelId="select-lead-type-small-label"
						id="select-lead-type-small"
						value={type}
						label="Lead Type"
						onChange={handleChange}
					>
						<MenuItem value="All">
							<em>All</em>
						</MenuItem>
						<MenuItem value={"Absentee"}>Absentee Owner</MenuItem>
						<MenuItem value={"Foreclosure"}>Foreclosure</MenuItem>
						<MenuItem value={"Probate"}>Probate</MenuItem>
					</Select>
				</FormControl>
			</FlexBetween>

			<PropertyTable properties={properties} />
		</Box>
	);
}

export default Leadfind;
