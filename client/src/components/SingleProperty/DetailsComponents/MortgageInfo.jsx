import React from "react";
import { Box, Typography, Grid } from "@mui/material";

/**
 * MortgageInfo component for displaying mortgage-related information.
 *
 * @component
 * @param {Object} props - React component properties.
 * @param {Object} props.property - Property details.
 * @param {Object} props.analytics - Property analytics data.
 *
 * @returns {JSX.Element} - Rendered MortgageInfo component.
 */
function MortgageInfo({ property, analytics }) {
	const formatDollarValue = (value) => {
		const numericValue = parseFloat(value);
		return numericValue.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
	};

	return (
		<Box>
			<Grid container spacing={0}>
				{/* First Box (80% width) */}
				<Grid item xs={6}>
					<Box p={2}>
						<Grid container spacing={2}>
							{/* First column */}
							<Grid item xs={6}>
								<Typography variant="h6" marginTop={1}>
									Latest Mortgage Date:
								</Typography>
								<Typography variant="h6" marginTop={1}>
									Loan Amount:
								</Typography>
								<Typography variant="h6" marginTop={1}>
									Grantee Full Name:
								</Typography>
								<Typography variant="h6" marginTop={1}>
									Estimated Balance:
								</Typography>
								<Typography variant="h6" marginTop={1}>
									Estimated Equity:
								</Typography>
							</Grid>
							{/* Second column */}
							<Grid item xs={6}>
								<Typography
									variant="h6"
									marginTop={1}
									fontWeight={"bold"}
								>
									{property.LatestMortgageDate}
								</Typography>
								<Typography
									variant="h6"
									marginTop={1}
									fontWeight={"bold"}
								>
									{formatDollarValue(
										property.LatestMortgageAmount
									)}
								</Typography>
								<Typography
									variant="h6"
									marginTop={1}
									fontWeight={"bold"}
								>
									{property.OwnerName}
								</Typography>
								<Typography
									variant="h6"
									marginTop={1}
									fontWeight={"bold"}
								>
									{formatDollarValue(
										analytics.estimatedLoanBalance
									)}
								</Typography>
								<Typography
									variant="h6"
									marginTop={1}
									fontWeight={"bold"}
								>
									{formatDollarValue(
										analytics.potentialEquity
									)}
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</Grid>

				{/* Second Box (80% width) */}
				<Grid item xs={6}>
					<Box p={2}>
						<Grid container spacing={2}>
							{/* First column */}
							<Grid item xs={6}>
								<Typography variant="h6" marginTop={1}>
									Esimated Mortage (Monthly):
								</Typography>
								<Typography variant="h6" marginTop={1}>
									Lender Name:
								</Typography>
								<Typography variant="h6" marginTop={1}>
									Loan Description:
								</Typography>
								<Typography variant="h6" marginTop={1}>
									Interest Rate:
								</Typography>
								<Typography variant="h6" marginTop={1}>
									Loan Terms:
								</Typography>
							</Grid>
							{/* Second column */}
							<Grid item xs={6}>
								<Typography
									variant="h6"
									marginTop={1}
									fontWeight={"bold"}
								>
									{formatDollarValue(
										analytics.estimatedMortgage
									)}
								</Typography>
								<Typography
									variant="h6"
									marginTop={1}
									fontWeight={"bold"}
								>
									{property.OwnerName}
								</Typography>
								<Typography
									variant="h6"
									marginTop={1}
									fontWeight={"bold"}
								>
									Not Reported
								</Typography>
								<Typography
									variant="h6"
									marginTop={1}
									fontWeight={"bold"}
								>
									Not Reported
								</Typography>
								<Typography
									variant="h6"
									marginTop={1}
									fontWeight={"bold"}
								>
									30 Years
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default MortgageInfo;
