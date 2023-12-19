import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import profileImage from "../assets/ProfileImage.jpeg";
import PageHeader from "../components/General/PageHeader";
import { useMediaQuery } from "@mui/material";
import { Container, Grid, Stack } from "@mui/material";
import AccountProfile from "../components/Account/AccountProfile";
import AccountDetails from "../components/Account/AccountDetails";

/**
 * Profile component for displaying user profile information.
 * Users can view their profile details and make updates.
 * @returns {JSX.Element} - Rendered Profile component.
 */
function Profile() {
	// Hook to navigate to different routes
	const navigate = useNavigate();

	// Get user data from Redux store
	const { user } = useSelector((state) => state.auth);

	// Redirect to login page if user is not authenticated
	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

	// Check if the screen size is non-mobile
	const isNonMobile = useMediaQuery("(min-width:1000px)");

	// Render the Profile component
	return (
		<Box m="1.5rem 2.5rem">
			<PageHeader title="Profile" subtitle="View your profile" />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth="lg">
					<Stack spacing={3}>
						<div>
							<Grid container spacing={3}>
								<Grid xs={12} md={6} lg={4}>
									<AccountProfile />
								</Grid>
								<Grid xs={12} md={6} lg={8}>
									<AccountDetails />
								</Grid>
							</Grid>
						</div>
					</Stack>
				</Container>
			</Box>
		</Box>
	);
}

export default Profile;
