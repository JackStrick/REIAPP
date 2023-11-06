// FavoriteButton.js
import React from 'react';
import { Button, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function FavoriteButton({ isFavorite, onToggle, property  }) {
    const theme = useTheme();
    const handleToggle = () => {
        if (onToggle) {
        onToggle(property);
        }
    };

    return (
        <Button onClick={handleToggle}>
        {isFavorite ? <FavoriteIcon sx={{color: theme.palette.secondary[500]}} /> : <FavoriteBorderIcon />}
        </Button>
    );
}

export default FavoriteButton;
