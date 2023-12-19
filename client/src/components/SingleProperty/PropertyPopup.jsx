import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Map from "../General/Map";

/**
 * PropertyPopup component for displaying property details in a popup dialog.
 *
 * @component
 * @param {Object} props - React component properties.
 * @param {boolean} props.open - Whether the dialog is open.
 * @param {Function} props.onClose - Callback function to close the dialog.
 * @param {Object} props.property - Property details.
 *
 * @returns {JSX.Element} - Rendered PropertyPopup component.
 */
function PropertyPopup({ open, onClose, property }) {
	// Function to format a number as a dollar value
	const formatDollarValue = (value) => {
		return value.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
	};

	// Function to navigate to the property page
	const toProperty = () => {
		window.location.href = `/properties/${property._id}`;
	};
	// You can customize the dialog content and layout here based on the property data.
	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				style: {
					width: "80%", // Adjust the width as needed was 2000px
					margin: "16px", // Adjust the margin as needed
				},
			}}
		>
			<Map properties={[property]} />
			<DialogTitle>Property Details</DialogTitle>
			<DialogContent>
				<div>
					<strong>Property Type:</strong> {property.PropertyType}
				</div>
				<div>
					<strong>Address:</strong>{" "}
					{`${property.PropertyAddress}, ${property.City}, ${property.State} ${property.ZipCode}`}
				</div>
				<div>
					<strong>Bedrooms:</strong> {property.Bedroom}
				</div>
				<div>
					<strong>Bathrooms:</strong> {property.Bathroom}
				</div>
				<div>
					<strong>Latest Sale Price:</strong>{" "}
					{formatDollarValue(property.LatestSalePrice)}
				</div>
				<div>
					<strong>Latest Sale Date:</strong> {property.LatestSaleDate}
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={toProperty}>More</Button>
				<Button onClick={onClose} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default PropertyPopup;
