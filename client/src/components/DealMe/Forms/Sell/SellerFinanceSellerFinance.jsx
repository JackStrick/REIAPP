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
 * SellerFinanceSellerFinance Component
 *
 * Description:
 * This component handles the financial analysis and calculations for buying a property
 * through seller financing and subsequently selling that property using seller financing.
 * It provides a detailed analysis of various financial aspects including loan details,
 * costs, profits, return on investment (ROI), and cash on cash returns.
 *
 * Props:
 * @param {Object} formData - The form data object containing purchase assumptions for buy side Seller Financing
 *
 * @returns {JSX.Element} React component for Seller Finance Analysis.
 */
function SellerFinanceSellerFinance({ formData }) {
	const theme = useTheme();
	const [sellerFormState, setSellerFormState] = React.useState({
		estPurchPrice: 0,
		monthsToSell: 0,
		loanAmount: 0,
		downPayment: 0,
		interestRate: 0,
		amortizationTerm: 0,
		ballonTerm: 0,
		monthlyPayment: 0,
		propInsurance: 0,
		propTaxes: 0,
		hoa: 0,
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

	const getLoanPayment = () => {
		const loanAmount = parseFloat(sellerFormState.loanAmount) || 0;
		const downPayment = parseFloat(sellerFormState.downPayment) || 0;
		const interestRate = parseFloat(sellerFormState.interestRate) || 0;
		const amortizationTerm =
			parseFloat(sellerFormState.amortizationTerm) || 0;
		const monthlyInterestRate = interestRate / 1200;
		const monthlyPayment =
			(loanAmount - downPayment) *
			(monthlyInterestRate /
				(1 -
					Math.pow(
						1 / (1 + monthlyInterestRate),
						amortizationTerm * 12
					)));
		sellerFormState.monthlyPayment = monthlyPayment;
		return monthlyPayment;
	};

	const getRepairCost = () => {
		const numRepairCost = parseFloat(formData.repairCost) || 0;
		const numHedgeExpense = parseFloat(formData.hedgeExpense) || 0;
		return numRepairCost + numRepairCost * (numHedgeExpense / 100);
	};

	const getAllCost = () => {
		const repair = getRepairCost();
		const other = getOtherCosts();
		const marketing = parseFloat(sellerFormState.marketingCost) || 0;
		const selling = parseFloat(sellerFormState.sellingCost) || 0;
		const purch = parseFloat(formData.estPurchasePrice) || 0;

		return repair + other + marketing + selling + purch;
	};

	const getHoldingTime = () => {
		const numRepairPeriod = parseFloat(formData.repairPeriod) || 0;
		const numMonthsToSell = parseFloat(sellerFormState.monthsToSell) || 0;
		return numRepairPeriod + numMonthsToSell;
	};

	const getOtherCosts = () => {
		const numHoldingTime = getHoldingTime();
		const numMonthlyHoldingCost =
			parseFloat(formData.monthlyHoldingCost) || 0;
		const numClosingCost = parseFloat(formData.closingCost) || 0;
		const numPropInsurance = parseFloat(formData.propertyInsurance) || 0;
		const numPropertyTaxes = parseFloat(formData.propertyTax) || 0;
		const numHOA = parseFloat(formData.hoa) || 0;

		return (
			numHoldingTime * numMonthlyHoldingCost +
			numClosingCost +
			numHoldingTime * numPropInsurance +
			numHoldingTime * numPropertyTaxes +
			numHoldingTime * numHOA
		);
	};

	const getNetProfit = () => {
		const costs = getTotalExpense();
		const received = getReceived();
		return received - costs;
	};

	const getReceived = () => {
		const monthly = sellerFormState.monthlyPayment;
		const loanTerm = parseFloat(sellerFormState.amortizationTerm) || 0;
		const down = parseFloat(sellerFormState.downPayment) || 0;

		return monthly * (loanTerm * 12) + down;
	};

	const getTotalExpense = () => {
		const purchase = parseFloat(formData.loanAmount) || 0;
		const repairs = getRepairCost();
		const other = getOtherCosts();
		const holding = getHoldingTime();
		const monthly = sellerFormState.monthlyPayment;

		return (repairs + other + holding * monthly + purchase) * 1.0675;
	};

	const getROI = () => {
		const allin = getAllCost() || 0;
		const profit = getNetProfit() || 0;

		const final = (profit / allin) * 100;

		return final;
	};

	return (
		<Box sx={{ marginTop: 2 }}>
			{/* Title */}
			<Typography
				variant="h4"
				sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
			>
				Seller Finance Analysis
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
					label="Estimated Purchase Price"
					type="number"
					name="estPurchPrice"
					value={sellerFormState.estPurchPrice}
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
					label="Estimated Months To Sell"
					type="number"
					name="monthsToSell"
					value={sellerFormState.monthsToSell}
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

			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Loan Amount"
					type="number"
					name="loanAmount"
					value={sellerFormState.loanAmount}
					onChange={handleInputChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">$</InputAdornment>
						),
						//endAdornment: <InputAdornment position="end">/mo</InputAdornment>,
					}}
				/>
			</FormControl>
			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Down Payment"
					type="number"
					name="downPayment"
					value={sellerFormState.downPayment}
					onChange={handleInputChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">$</InputAdornment>
						),
						//endAdornment: <InputAdornment position="end">/mo</InputAdornment>,
					}}
				/>
			</FormControl>
			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Interest Rate"
					type="number"
					name="interestRate"
					value={sellerFormState.interestRate}
					onChange={handleInputChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">%</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">%</InputAdornment>
						),
					}}
				/>
			</FormControl>
			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Amortization Term"
					type="number"
					name="amortizationTerm"
					value={sellerFormState.amortizationTerm}
					onChange={handleInputChange}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								years
							</InputAdornment>
						),
					}}
				/>
			</FormControl>
			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<TextField
					label="Property Insurance"
					type="number"
					name="propertyInsurance"
					value={sellerFormState.propertyInsurance}
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
					value={sellerFormState.propertyTax}
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
					value={sellerFormState.hoa}
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
			<FormControl fullWidth sx={{ marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h5"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Loan Monthly Payment
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h5"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(getLoanPayment()) || 0}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>

			{/* Subheading */}
			<Typography
				variant="h4"
				fontWeight="bold"
				sx={{ marginTop: 2, marginBottom: 1 }}
			>
				Analysis
			</Typography>

			{/* Subheading */}
			<Typography
				variant="h6"
				fontWeight="bold"
				sx={{ marginTop: 2, marginBottom: 1 }}
			>
				Loan With Seller
			</Typography>
			<FormControl fullWidth sx={{ marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6}>
						<Typography
							className="analysis-typography"
							align="left"
							variant="h6"
							sx={{ marginBottom: 2 }}
						>
							Total Loan Amount
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
								(parseFloat(formData.loanAmount) || 0) -
									(parseFloat(formData.downPayment) || 0)
							)}
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
							Monthly P&I Payment
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
								parseFloat(formData.monthlyPayment) || 0
							)}
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
							Insurance, Taxes, & HOA Payments
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
								(parseFloat(formData.propertyInsurance) || 0) +
									(parseFloat(formData.propertyTax) || 0) +
									(parseFloat(formData.hoa) || 0)
							)}
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
							Total Monthly Payment
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
								(parseFloat(formData.monthlyPayment) || 0) +
									(parseFloat(formData.propertyInsurance) ||
										0) +
									(parseFloat(formData.propertyTax) +
										parseFloat(formData.hoa) || 0)
							)}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>

			<hr />

			<FormControl fullWidth sx={{ marginTop: 2, marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6} position="end">
						<Typography
							position="end"
							variant="h6"
							align="left"
							sx={{ marginBottom: 2 }}
						>
							Purchase Price
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h6"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(formData.estPurchasePrice)}
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
							Total Repairs
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							className="analysis-typography"
							align="right"
							variant="h6"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(getRepairCost())}
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
							Total Holding Time
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							className="analysis-typography"
							align="right"
							variant="h6"
							sx={{ marginBottom: 2 }}
						>
							{getHoldingTime()} months
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
							Total Other Costs
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							className="analysis-typography"
							align="right"
							variant="h6"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(getOtherCosts())}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>

			<hr />
			{/* Subheading */}
			<Typography
				variant="h6"
				fontWeight="bold"
				sx={{ marginTop: 2, marginBottom: 1 }}
			>
				Loan With Buyer
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
							Sales Price
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							position="end"
							variant="h6"
							align="right"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(sellerFormState.estPurchPrice)}
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
							Loan Amount
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
								parseFloat(sellerFormState.loanAmount) -
									parseFloat(sellerFormState.downPayment)
							)}
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
							Monthly P&I Payment
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
								parseFloat(sellerFormState.monthlyPayment)
							)}
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
							Insurance, Taxes, & HOA Payments
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
								parseFloat(sellerFormState.propertyInsurance) +
									parseFloat(sellerFormState.propertyTax) +
									parseFloat(sellerFormState.hoa)
							)}
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
							Total Monthly Payment
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
								parseFloat(sellerFormState.monthlyPayment) +
									parseFloat(
										sellerFormState.propertyInsurance
									) +
									parseFloat(sellerFormState.propertyTax) +
									parseFloat(sellerFormState.hoa)
							)}
						</Typography>
					</Grid>
				</Grid>
			</FormControl>

			{/* Subheading */}
			<Typography
				variant="h6"
				fontWeight="bold"
				sx={{ marginTop: 2, marginBottom: 1 }}
			>
				Totals
			</Typography>

			<FormControl fullWidth sx={{ marginBottom: 0 }}>
				<Grid container>
					<Grid item xs={6}>
						<Typography
							className="analysis-typography"
							align="left"
							variant="h6"
							sx={{ marginBottom: 2 }}
						>
							Total Received
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							className="analysis-typography"
							align="right"
							variant="h6"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(getReceived())}
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
							Total Expenses
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography
							className="analysis-typography"
							align="right"
							variant="h6"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(getTotalExpense())}
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
					<Grid item xs={4} sx={{ marginTop: 2 }}>
						<Typography
							className="analysis-typography"
							align="center"
							variant="h6"
						>
							TOTAL NET PROFIT
						</Typography>
						<Typography
							className="analysis-typography"
							align="center"
							variant="h4"
							fontWeight="bold"
							sx={{ marginBottom: 2 }}
						>
							{formatDollarValue(getNetProfit())}
						</Typography>
					</Grid>
					<Grid item xs={4} sx={{ marginTop: 2 }}>
						<Typography
							className="analysis-typography"
							align="center"
							variant="h6"
						>
							ROI
						</Typography>
						<Typography
							className="analysis-typography"
							align="center"
							variant="h4"
							fontWeight="bold"
							sx={{ marginBottom: 2 }}
						>
							{getROI().toFixed(2)}%
						</Typography>
					</Grid>
					<Grid item xs={4} sx={{ marginTop: 2 }}>
						<Typography
							className="analysis-typography"
							align="center"
							variant="h6"
						>
							CASH ON CASH
						</Typography>
						<Typography
							className="analysis-typography"
							align="center"
							variant="h4"
							fontWeight="bold"
							sx={{ marginBottom: 2 }}
						>
							{getROI().toFixed(2)}%
						</Typography>
					</Grid>
				</Grid>
			</FormControl>
		</Box>
	);
}

export default SellerFinanceSellerFinance;
