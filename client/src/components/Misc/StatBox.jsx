import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useSelector } from "react-redux";

/**
 * StatBox component for displaying a statistical box.
 *
 * @component
 * @param {Object} props - React component properties.
 * @param {string} props.title - The title of the statistical box.
 * @param {string} props.value - The numerical value to be displayed.
 * @param {string} props.increase - The increase description or value.
 * @param {JSX.Element} props.icon - The icon to be displayed next to the title.
 * @param {string} props.description - Additional description or information.
 *
 * @returns {JSX.Element} - Rendered StatBox component.
 */
const StatBox = ({ title, value, increase, icon, description }) => {
	const theme = useTheme();
	const mode = useSelector((state) => state.mode.mode);

	return (
		<Box
			gridColumn="span 2"
			gridRow="span 1"
			display="flex"
			flexDirection="column"
			justifyContent="space-between"
			p="1.25rem 1rem"
			flex="1 1 100%"
			backgroundColor={
				mode === "dark"
					? theme.palette.neutral.light
					: theme.palette.grey[200]
			}
			borderRadius="0.55rem"
			hover="pointer"
			sx={{
				"&:hover": {
					backgroundColor:
						mode === "dark"
							? theme.palette.grey[900]
							: theme.palette.neutral.light,
				},
			}}
		>
			<FlexBetween>
				<Typography
					variant="h6"
					sx={{ color: theme.palette.secondary[100] }}
				>
					{title}
				</Typography>
				{icon}
			</FlexBetween>

			<Typography
				variant="h3"
				fontWeight="600"
				sx={{ color: theme.palette.secondary[200] }}
			>
				{value}
			</Typography>
			<FlexBetween gap="1rem">
				<Typography
					variant="h5"
					fontStyle="italic"
					sx={{ color: theme.palette.secondary.light }}
				>
					{increase}
				</Typography>
				<Typography>{description}</Typography>
			</FlexBetween>
		</Box>
	);
};

export default StatBox;
