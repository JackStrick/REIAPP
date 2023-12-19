// PropertyTable.js
import React, { useState, useEffect } from "react";
import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Button,
	useTheme,
	Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchUserProperties,
	deleteUserProperty,
	createUserProperty,
} from "../../features/api/dbSlice";
import PropertyPopup from "../SingleProperty/PropertyPopup"; // Import the PropertyPopup component
import FavoriteButton from "../Misc/FavoriteButton";

/**
 * PropertyTable component for displaying a table of properties.
 *
 * @component
 * @param {Object} props - React component properties.
 * @param {Array} props.properties - Array of properties to display.
 * @param {string} props.name - Name of the property table.
 *
 * @returns {JSX.Element} - Rendered PropertyTable component.
 */
function PropertyTable({ properties, name }) {
	const theme = useTheme();
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [userProperties, setUserProperties] = useState([]);

	useEffect(() => {
		const getUserProperties = async () => {
			const response = await dispatch(fetchUserProperties(user._id));
			const updatedUserProperties = response.payload || [];
			setUserProperties(updatedUserProperties);
		};

		if (user) {
			getUserProperties();
		}
	}, [user, dispatch]);

	const handleViewClick = (property) => {
		setSelectedProperty(property);
	};

	const handleRowClick = (property) => {
		window.location.href = `/properties/${property._id}`;
	};

	const formatDollarValue = (value) => {
		return value.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
	};

	const togglePropertyFavorite = async (property) => {
		console.log("togglePropertyFavorite", property._id);
		if (isPropertyInUserProperties(property)) {
			await dispatch(
				deleteUserProperty({
					userId: user._id,
					propertyId: property._id,
				})
			);
		} else {
			await dispatch(
				createUserProperty({
					userId: user._id,
					propertyId: property._id,
				})
			);
		}

		const response = await dispatch(fetchUserProperties(user._id));
		const updatedUserProperties = response.payload || [];
		setUserProperties(updatedUserProperties);
	};

	const isPropertyInUserProperties = (property) => {
		return userProperties.some(
			(userProperty) => userProperty._id === property._id
		);
	};

	return (
		<div>
			<Typography
				variant="h3"
				fontWeight="bold"
				sx={{ mb: "5px" }}
				gutterBottom
			>
				{name}
			</Typography>
			<TableContainer component={Paper}>
				<Table color="inherit">
					<TableHead>
						<TableRow>
							<TableCell>Address</TableCell>
							<TableCell>City</TableCell>
							<TableCell>State</TableCell>
							<TableCell>Zip</TableCell>
							<TableCell>Property Type</TableCell>
							<TableCell>Bedrooms</TableCell>
							<TableCell>Bathrooms</TableCell>
							<TableCell>Latest Sale Price</TableCell>
							<TableCell>Latest Sale Date</TableCell>
							<TableCell>Lead Type</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{properties.map((property) => (
							<TableRow key={property._id}>
								<TableCell
									onClick={() => handleRowClick(property)}
									sx={{
										":hover": {
											cursor: "pointer",
											textDecoration: "underline",
										},
									}}
								>
									{property.PropertyAddress}
								</TableCell>
								<TableCell>{property.City}</TableCell>
								<TableCell>{property.State}</TableCell>
								<TableCell>{property.ZipCode}</TableCell>
								<TableCell>{property.PropUsage}</TableCell>
								<TableCell>{property.Bedroom}</TableCell>
								<TableCell>{property.Bathroom}</TableCell>
								<TableCell>
									{formatDollarValue(
										property.LatestSalePrice
									)}
								</TableCell>
								<TableCell>{property.LatestSaleDate}</TableCell>
								<TableCell>{property.PropertyType}</TableCell>
								<TableCell>
									<Button
										sx={{ color: theme.palette.grey.dark }}
										onClick={() =>
											handleViewClick(property)
										}
									>
										Quick View
									</Button>
									<FavoriteButton
										property={property}
										isFavorite={isPropertyInUserProperties(
											property
										)}
										onToggle={togglePropertyFavorite}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{selectedProperty && (
				<PropertyPopup
					open={true}
					onClose={() => setSelectedProperty(null)}
					property={selectedProperty}
				/>
			)}
		</div>
	);
}

export default PropertyTable;
