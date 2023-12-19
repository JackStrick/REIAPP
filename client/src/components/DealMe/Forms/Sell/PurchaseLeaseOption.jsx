import React from "react";
import {
	Box,
	Divider,
	FormControl,
	InputAdornment,
	TextField,
	Typography,
	Grid,
	useTheme,
} from "@mui/material";

/**
 * PurchaseLeaseOption Component
 *
 * This component provides a lease option analysis, calculating various financial metrics
 * related to the purchase of a property using a lease option strategy.
 *
 * @component
 * @param {Object} formData - Data related to the lease option.
 * @returns {JSX.Element} - Rendered PurchaseLeaseOption component.
 *
 * @example
 * // Example Usage
 * <PurchaseLeaseOption formData={formData} />
 *
 * @note Ensure that the formData object contains the necessary properties for calculations.
 */
function PurchaseLeaseOption({ formData }) {
	const theme = useTheme();

	const [sellerFormState, setSellerFormState] = React.useState({
		salesPrice: 0,
		optionPayment: 0,
		monthlyRental: 0,
		monthlyCredits: 0,
		optionTerm: 0,
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setSellerFormState((prevFormState) => ({
			...prevFormState,
			[name]: parseFloat(value),
		}));
	};

	const formatDollarValue = (value) => {
		if (value === "") {
			return "$0.00";
		}
		value = parseFloat(value) || 0;
		return value.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
	};

	const getBackEnd = () => {
		const salesPrice =
			(parseFloat(sellerFormState.salesPrice) || 0) -
			(parseFloat(formData.estPurchasePrice) || 0);
		const optionPayment = parseFloat(sellerFormState.optionPayment) || 0;
		const credits = parseFloat(sellerFormState.monthlyCredits) || 0;
		const leaseTerm = parseFloat(sellerFormState.optionTerm) || 0;
		const repairCost = getRepairCost();
		const side = getMonthlySideCost();
		const repairPeriod = parseFloat(formData.repairPeriod) || 0;
		const closingCost = parseFloat(formData.closingCost) || 0;

		const totalSide = side * repairPeriod;

		return (
			salesPrice -
			optionPayment -
			credits * leaseTerm -
			repairCost -
			totalSide -
			closingCost
		);
	};

	const getNetProfit = () => {
		const totalCashFlow = getTotalCashFlow();
		const optionPayment = parseFloat(sellerFormState.optionPayment) || 0;
		const backend = getBackEnd();

		return totalCashFlow + optionPayment + backend;
	};
	const getRepairCost = () => {
		const numRepairCost = parseFloat(formData.repairCost) || 0;
		const numHedgeExpense = parseFloat(formData.hedgeExpense) || 0;
		return numRepairCost + numRepairCost * (numHedgeExpense / 100);
	};

	const getMonthlySideCost = () => {
		const numPropInsurance = parseFloat(formData.propertyInsurance) || 0;
		const numPropertyTaxes = parseFloat(formData.propertyTax) || 0;
		const numHOA = parseFloat(formData.hoa) || 0;
		const holding = parseFloat(formData.monthlyHoldingCost) || 0;
		return numPropInsurance + numPropertyTaxes + numHOA + holding;
	};

	const cashRequired = () => {
		const purch = parseFloat(formData.estPurchasePrice) || 0;
		const repair = getRepairCost();
		const side = getMonthlySideCost();

		return (
			purch +
			repair +
			side * (parseFloat(formData.repairPeriod) || 0) +
			parseFloat(formData.closingCost)
		);
	};

	const getTotalCashFlow = () => {
		const numPropInsurance = parseFloat(formData.propertyInsurance) || 0;
		const numPropertyTaxes = parseFloat(formData.propertyTax) || 0;
		const numHOA = parseFloat(formData.hoa) || 0;

		return (
			(sellerFormState.monthlyRental -
				(numPropInsurance + numPropertyTaxes + numHOA)) *
			sellerFormState.optionTerm
		);
	};

	return (
		<Box sx={{ marginTop: 2 }}>
			{/* Title */}
			<Typography
				variant="h4"
				sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
			>
				Lease Option Analysis
			</Typography>
			{/* Colored Bar */}
			<Divider
				sx={{
					backgroundColor: theme.palette.primary.main,
					height: 3,
					marginY: 2,
				}}
			/>
			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Sales Price"
					type="number"
					name="salesPrice"
					value={sellerFormState.salesPrice}
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
					value={sellerFormState.optionPayment}
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
					value={sellerFormState.monthlyRental}
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
					label="Monthly Credits (Optional)"
					type="number"
					name="monthlyCredits"
					value={sellerFormState.monthlyCredits}
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
					label="Lease Option Term"
					type="number"
					name="optionTerm"
					value={sellerFormState.optionTerm}
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

			<hr />

			{/* Subheading */}
			<Typography
				variant="h4"
				fontWeight="bold"
				sx={{ marginTop: 2, marginBottom: 1 }}
			>
				Analysis
			</Typography>

			<FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h6"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Total Cash Required For Project
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h6"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(cashRequired())}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>
			<FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h6"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Total All-In Cost For Project
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h6"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(cashRequired())}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>
			<FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h6"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Buyer Sales Price
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h6"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(sellerFormState.salesPrice)}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>
			<FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h6"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Buyer Down Payment
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h6"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(sellerFormState.optionPayment)}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>
			<FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h6"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Buyer Sales Price
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h6"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(
								parseFloat(sellerFormState.salesPrice) -
									parseFloat(sellerFormState.optionPayment)
							)}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>
			<FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h6"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Monthly Rent from Buyer
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h6"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(sellerFormState.monthlyRental)}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>
			<FormControl fullWidth sx={{ marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6}>
						<Typography
							className="analysis-typography"
							align="left"
							variant="h6"
							sx={{ marginBottom: 2 }}
						>
							Monthly Insurance, Taxes, & HOA
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							className="analysis-typography"
							align="right"
							variant="h6"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(
								parseFloat(formData.propertyInsurance) +
									parseFloat(formData.propertyTax) +
									parseFloat(formData.hoa)
							)}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>
			<FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h6"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Monthly Cash Flow Received
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h6"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(
								sellerFormState.monthlyRental -
									(parseFloat(formData.propertyInsurance) +
										parseFloat(formData.propertyTax) +
										parseFloat(formData.hoa))
							)}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>
			<FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h6"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Out - Monthly Credits to Buyer
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h6"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(sellerFormState.monthlyCredits)}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>

			<hr />

			{/* Subheading */}
			<Typography
				variant="h4"
				fontWeight="bold"
				sx={{ marginTop: 2, marginBottom: 1 }}
			>
				Profit Centers
			</Typography>

			<FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h6"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Option Payment Received
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h6"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(sellerFormState.optionPayment)}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>

			<FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h6"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Total Cash Flow Received
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h6"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(getTotalCashFlow())}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>
			<FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h6"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Monthly Credits
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h6"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(
								sellerFormState.monthlyCredits *
									sellerFormState.optionTerm
							)}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>
			<FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h6"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Backend Sales Price Received
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h6"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(getBackEnd())}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>

			<FormControl
				fullWidth
				sx={{
					marginTop: 0,
					marginBottom: 0,
					backgroundColor: "#00c02178",
				}}
			>
				<Grid container color={"success"}>
					<Grid item xs={12} sx={{ marginTop: 2, marginRight: 2 }}>
						<Typography
							className="analysis-typography"
							align="right"
							variant="h6"
						>
							TOTAL NET PROFIT
						</Typography>
						<Typography
							className="analysis-typography"
							align="right"
							variant="h4"
							fontWeight="bold"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(getNetProfit())}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>
		</Box>
	);
}

export default PurchaseLeaseOption;
