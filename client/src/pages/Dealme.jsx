import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	Box,
	Card,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from "@mui/material";
import { fetchUserProperties } from "../features/api/dbSlice";
import PageHeader from "../components/General/PageHeader";
import AlertPop from "../components/Misc/AlertPop";
import BasicInfo from "../components/SingleProperty/BasicInfo";
import DealStrategy from "../components/DealMe/DealStrategy";

/**
 * DealMe component for analyzing whether a lead is a good deal.
 * Allows users to select a property and view its basic information and deal strategy.
 * @returns {JSX.Element} - Rendered DealMe component.
 */
function Dealme() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const [userProperties, setUserProperties] = useState([]);
	const [property, setProperty] = useState(null);

	// Handle property selection change
	const handleChange = (event) => {
		setProperty(event.target.value);
	};

	// Ensure user is authenticated, otherwise redirect to login
	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

	// Fetch user properties when the user is available
	useEffect(() => {
		const getUserProperties = async () => {
			const response = await dispatch(fetchUserProperties(user._id));
			const updatedUserProperties = response.payload || [];
			setUserProperties(updatedUserProperties);
		};

		if (user) {
			getUserProperties();
		}
	}, [user, dispatch]);

	return (
		<Box m="0.5rem 1.5rem">
			<Card variant="outlined">
				<Box m="1.5rem 2.5rem">
					<PageHeader
						title="DealMe"
						subtitle="Is your lead a good deal?"
					/>
					{userProperties.length > 0 ? (
						<FormControl fullWidth sx={{ marginTop: 1 }}>
							<InputLabel id="select-label">Property</InputLabel>
							<Select
								labelId="select-label"
								id="select"
								value={property}
								label="Property"
								onChange={handleChange}
							>
								{userProperties.map((property) => (
									<MenuItem value={property}>
										{property.PropertyAddress}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					) : (
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
					{userProperties.length > 0 && property ? (
						<Box>
							<BasicInfo property={property} />

							<hr />

							<DealStrategy property={property} />
						</Box>
					) : null}
				</Box>
			</Card>
		</Box>
	);
}

export default Dealme;
