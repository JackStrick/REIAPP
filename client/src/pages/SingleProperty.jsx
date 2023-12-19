import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchPropertyById,
	fetchPropertyAnalytics,
} from "../features/api/dbSlice";
import PropertyAnalytics from "../components/SingleProperty/PropertyAnalytics";
import BasicInfo from "../components/SingleProperty/BasicInfo";
import PropertyDetails from "../components/SingleProperty/PropertyDetails";
import { Box, Button, useMediaQuery, Typography, Card } from "@mui/material";
import Spinner from "../components/Misc/Spinner";

/**
 * SingleProperty component for displaying details of a single property.
 * Fetches property information and analytics using Redux actions.
 * Renders BasicInfo, PropertyAnalytics, and PropertyDetails components.
 * @returns {JSX.Element} - Rendered SingleProperty component.
 */
function SingleProperty() {
	const { user } = useSelector((state) => state.auth);
	const { propertyId } = useParams();
	const dispatch = useDispatch();
	const [property, setProperty] = useState(null);
	const [analytics, setAnalytics] = useState(null);

	// Fetch property information and analytics on component mount
	useEffect(() => {
		const getPropertyInfo = async () => {
			const propData = await dispatch(fetchPropertyById(propertyId));
			const property = propData.payload || [];
			setProperty(property);

			const propAnalytics = await dispatch(
				fetchPropertyAnalytics(property.zpid)
			);
			const analytics = propAnalytics.payload || [];
			setAnalytics(analytics[0]);
		};

		if (user) {
			getPropertyInfo();
		}
	}, [user, propertyId, dispatch]);

	// Render a loading spinner if property or analytics data is not available
	if (!property || !analytics) {
		return <Spinner />;
	}

	return (
		<Box m="1.5rem 2.5rem">
			<Card variant="outlined">
				<BasicInfo property={property} />
			</Card>
			<Card sx={{ marginTop: 3 }} variant="outlined">
				<PropertyAnalytics analytics={analytics} />
			</Card>
			<Card sx={{ marginTop: 3 }} variant="outlined">
				<PropertyDetails property={property} analytics={analytics} />
			</Card>
		</Box>
	);
}

export default SingleProperty;
