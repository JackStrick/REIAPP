import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProperties } from "../features/api/dbSlice";
import { Box, Button, useMediaQuery, Typography } from "@mui/material";
import PageHeader from "../components/General/PageHeader";
import Map from "../components/General/Map";
import FlexBetween from "../components/Misc/FlexBetween";
import { useTheme } from "@emotion/react";
import StatBox from "../components/Misc/StatBox";
import { TbTargetArrow } from "react-icons/tb";
import GavelIcon from "@mui/icons-material/Gavel";
import SailingIcon from "@mui/icons-material/Sailing";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PropTableHome from "../components/MultiProperty/PropTableHome";
import AlertPop from "../components/Misc/AlertPop";

/**
 * Dashboard component displaying user statistics, property map, and favorite properties.
 * @returns {JSX.Element} - Rendered Dashboard component.
 */
function Dashboard() {
	// Hook to navigate to different routes
	const navigate = useNavigate();
	// Get user data from Redux store
	const { user } = useSelector((state) => state.auth);

	// Hook to access MUI theme
	const theme = useTheme();
	// Check for screen size
	const isNonMediumScreens = useMediaQuery("(min-width:1200px)");

	// Local state to store user properties
	const [properties, setProperties] = useState([]);
	// Redux dispatch function
	const dispatch = useDispatch();

	// Ensure user is authenticated, otherwise redirect to login
	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

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

	const handlePropViewClick = () => {
		navigate("/properties");
	};

	return (
		<Box m="1.5rem 2.5rem">
			<PageHeader title="Dashboard" subtitle="" />
			<Box
				mt="20px"
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="160px"
				gap="20px"
				sx={{
					"& > div": {
						gridColumn: isNonMediumScreens ? undefined : "span 12",
					},
				}}
			>
				{/*ROW 1*/}

				<StatBox
					title="Total Leads"
					value="41"
					increase="+14%"
					description="Since last month"
					icon={
						<TbTargetArrow
							size="26px"
							color={theme.palette.secondary[300]}
						/>
					}
				/>
				<StatBox
					title="Total Probate"
					value="7"
					increase="+17%"
					description="Since last month"
					icon={
						<GavelIcon
							size="26px"
							color={theme.palette.secondary[300]}
						/>
					}
				/>

				<Box
					gridColumn="span 8"
					gridRow="span 2"
					backgroundColor={theme.palette.background.alt}
					p="1rem"
					borderRadius="0.55rem"
				>
					{properties.length > 0 && <Map properties={properties} />}
				</Box>

				<StatBox
					title="Total Absentee"
					value="9"
					increase="-12.5%"
					description="Since last month"
					icon={
						<SailingIcon
							size="26px"
							color={theme.palette.secondary[300]}
						/>
					}
				/>
				<StatBox
					title="Total Foreclosure"
					value="25"
					increase="+25%"
					description="Since last month"
					icon={
						<AccountBalanceIcon
							size="26px"
							color={theme.palette.secondary[300]}
						/>
					}
				/>
				{/*ROW 2*/}
				<Box gridColumn="span 12" gridRow="span 3">
					<FlexBetween>
						<Typography
							variant="h3"
							fontWeight="bold"
							sx={{ mb: "5px" }}
							gutterBottom
						>
							Favorite Properties
						</Typography>
						<Button
							size="medium"
							variant="contained"
							onClick={handlePropViewClick}
						>
							View All
						</Button>
					</FlexBetween>
					<PropTableHome properties={properties.slice(0, 5)} />
					{properties.length === 0 && (
						<AlertPop
							open={true}
							linkTo={`/leadfind`}
							buttonText={"Find Leads"}
							title={"No Properties Added"}
							desc={
								"Add properties to your favorites list to find deals"
							}
						/>
					)}
				</Box>
			</Box>
		</Box>
	);
}

export default Dashboard;
