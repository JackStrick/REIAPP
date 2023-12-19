import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	TextField,
	Unstable_Grid2 as Grid,
} from "@mui/material";

/**
 * Functional component representing the account details form.
 * @returns {JSX.Element} The rendered component.
 */

const AccountDetails = () => {
	// Get user data from Redux store
	const { user } = useSelector((state) => state.auth);

	// State to manage form values
	const [values, setValues] = useState({
		firstName: user.fname,
		lastName: user.lname,
		email: user.email,
		phone: user.phone,
	});

	const handleChange = useCallback((event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	});

	const handleSubmit = useCallback((event) => {
		event.preventDefault();
	}, []);

	return (
		<form autoComplete="off" noValidate onSubmit={handleSubmit}>
			<Card>
				<CardHeader
					subheader="The information can be edited"
					title="Profile"
				/>
				<CardContent sx={{ pt: 0 }}>
					<Box sx={{ m: -1.5 }}>
						<Grid container spacing={3}>
							<Grid xs={12} md={6}>
								<TextField
									fullWidth
									helperText="Please specify the first name"
									label="First name"
									name="firstName"
									disabled
									required
									value={user.fname}
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									fullWidth
									label="Last name"
									name="lastName"
									disabled
									required
									value={user.lname}
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									fullWidth
									label="Email Address"
									name="email"
									disabled
									required
									value={user.email}
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									fullWidth
									label="Phone Number"
									name="phone"
									disabled
									type="number"
									value={user.phone}
								/>
							</Grid>
						</Grid>
					</Box>
				</CardContent>
				<Divider />
			</Card>
		</form>
	);
};

export default AccountDetails;
