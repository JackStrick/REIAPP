import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import PageHeader from "../components/General/PageHeader";
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
