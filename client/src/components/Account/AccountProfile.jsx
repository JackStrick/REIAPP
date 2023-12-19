import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import ProfileImage from "../../assets/ProfileImage.jpeg";
import Duck from "../../assets/Duck.jpeg";

/**
 * Functional component representing the account profile info.
 * @returns {JSX.Element} The rendered component.
 */

const AccountProfile = () => {
	// Get user data from Redux store
	const { user } = useSelector((state) => state.auth);

	return (
		<Card>
			<CardContent>
				<Box
					sx={{
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Avatar
						src={user.fname !== "Victor" ? ProfileImage : Duck}
						sx={{
							height: 80,
							mb: 2,
							width: 80,
						}}
					/>
					<Typography gutterBottom variant="h5">
						{user.fname} {user.lname}
					</Typography>
					<Typography color="text.secondary" variant="body2">
						Ramapo NJ
					</Typography>
					<Typography color="text.secondary" variant="body2">
						{user.fname !== "Victor"
							? "Real Estate Investor"
							: "Professor"}
					</Typography>
				</Box>
			</CardContent>
			<Divider />
		</Card>
	);
};

export default AccountProfile;
