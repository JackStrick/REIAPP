import React from "react";
import {
	Box,
	Divider,
	FormControl,
	InputAdornment,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";

/**
 * BuyPurchaseForm Component
 *
 * A React component representing a form for entering purchase assumptions
 * related to buying a property.
 *
 * @component
 * @props {Object} formData - The form data object containing purchase assumptions.
 * @props {Function} onChange - Callback function triggered on input changes.
 */
function BuyPurchaseForm({ formData, onChange }) {
	const theme = useTheme();

	const handleInputChange = (e) => {
		// Update the specific field in formData when the input changes
		const { name, value } = e.target;
		onChange((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const formatDollarValue = (value) => {
		value = parseFloat(value) || 0;
		return value.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
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
				Basic Numbers
			</Typography>

			{/* Form Items */}
			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="After Repair Value (ARV)"
					type="number"
					name="arv"
					value={formData.arv}
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
					label="Esitmated Purchase Price"
					type="number"
					name="estPurchasePrice"
					value={formData.estPurchasePrice}
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
					label="Property Square Footage"
					type="number"
					name="propSqft"
					value={formData.propSqft}
					onChange={handleInputChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">#</InputAdornment>
						),
					}}
				/>
			</FormControl>
			<FormControl fullWidth sx={{ marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h5"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Cost Per Square Foot
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h5"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(
								formData.estPurchasePrice / formData.propSqft
							) || 0}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>

			{/* Subheading */}
			<Typography variant="h5" sx={{ marginBottom: 2 }}>
				Repair Cost
			</Typography>

			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Estimated Repair Costs"
					type="number"
					name="repairCost"
					value={formData.repairCost}
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
					label="Hedge Expense"
					type="number"
					name="hedgeExpense"
					value={formData.hedgeExpense}
					onChange={handleInputChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">%</InputAdornment>
						),
					}}
				/>
			</FormControl>
			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Repair Period"
					type="number"
					name="repairPeriod"
					value={formData.repairPeriod}
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

			{/* Subheading */}
			<Typography variant="h5" sx={{ marginBottom: 2 }}>
				Other Cost
			</Typography>

			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Monthly Holding Costs"
					type="number"
					name="monthlyHoldingCost"
					value={formData.monthlyHoldingCost}
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
					label="Closing Costs"
					type="number"
					name="closingCost"
					value={formData.closingCost}
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
					label="Property Insurance"
					type="number"
					name="propertyInsurance"
					value={formData.propertyInsurance}
					onChange={handleInputChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">$</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">/mo</InputAdornment>
						),
					}}
				/>
			</FormControl>
			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Property Tax"
					type="number"
					name="propertyTax"
					value={formData.propertyTax}
					onChange={handleInputChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">$</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">/mo</InputAdornment>
						),
					}}
				/>
			</FormControl>
			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="HOA Dues"
					type="number"
					name="hoa"
					value={formData.hoa}
					onChange={handleInputChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">$</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">/mo</InputAdornment>
						),
					}}
				/>
			</FormControl>
		</Box>
	);
}

export default BuyPurchaseForm;
