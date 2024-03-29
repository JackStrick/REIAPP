import React from "react";
import {
	Box,
	Divider,
	FormControl,
	InputAdornment,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";

/**
 * LeaseOptionForm Component
 *
 * A React component representing a form for entering purchase assumptions
 * related to a lease option.
 *
 * @component
 * @props {Object} formData - The form data object containing purchase assumptions.
 * @props {Function} onChange - Callback function triggered on input changes.
 */
function LeaseOptionForm({ formData, onChange }) {
	const theme = useTheme();

	const handleInputChange = (e) => {
		// Update the specific field in formData when the input changes
		const { name, value } = e.target;
		onChange((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<Box sx={{ marginTop: 2 }}>
			{/* Title */}
			<Typography
				variant="h4"
				sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
			>
				Purchase Assumptions
			</Typography>
			{/* Colored Bar */}
			<Divider
				sx={{
					backgroundColor: theme.palette.primary.main,
					height: 3,
					marginY: 2,
				}}
			/>

			{/* Subheading */}
			<Typography variant="h5" sx={{ marginBottom: 2 }}>
				Offer Numbers
			</Typography>

			{/* Form Items */}
			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Sales Price"
					type="number"
					name="salesPrice"
					value={formData.salesPrice}
					onChange={handleInputChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">$</InputAdornment>
						),
					}}
				/>
			</FormControl>

			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Option Payment"
					type="number"
					name="optionPayment"
					value={formData.optionPayment}
					onChange={handleInputChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">$</InputAdornment>
						),
					}}
				/>
			</FormControl>

			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Monthly Rental Payment"
					type="number"
					name="monthlyRental"
					value={formData.monthlyRental}
					onChange={handleInputChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">$</InputAdornment>
						),
					}}
				/>
			</FormControl>

			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Monthly Credit (Optional)"
					type="number"
					name="monthlyCredit"
					value={formData.monthlyCredit}
					onChange={handleInputChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">$</InputAdornment>
						),
					}}
				/>
			</FormControl>

			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Lease Option Term (# Months)"
					type="number"
					name="leaseTerm"
					value={formData.leaseTerm}
					onChange={handleInputChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">#</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								months
							</InputAdornment>
						),
					}}
				/>
			</FormControl>
		</Box>
	);
}

export default LeaseOptionForm;
