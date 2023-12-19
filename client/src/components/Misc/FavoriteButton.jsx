// FavoriteButton.js
import React from "react";
import { Button, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

/**
 * FavoriteButton component for toggling favorite status.
 *
 * @param {Object} props - React component properties.
 * @param {boolean} props.isFavorite - Whether the item is marked as favorite.
 * @param {Function} props.onToggle - Callback function triggered on toggle.
 * @param {Object} props.property - The property associated with the button.
 *
 * @returns {JSX.Element} - Rendered FavoriteButton component.
 */
function FavoriteButton({ isFavorite, onToggle, property }) {
	const theme = useTheme();
	const handleToggle = () => {
		if (onToggle) {
			onToggle(property);
		}
	};

	return (
		<Button onClick={handleToggle}>
			{isFavorite ? (
				<FavoriteIcon sx={{ color: theme.palette.secondary[100] }} />
			) : (
				<FavoriteBorderIcon
					sx={{ color: theme.palette.secondary[100] }}
				/>
			)}
		</Button>
	);
}

export default FavoriteButton;
