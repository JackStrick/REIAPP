import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

/**
 * Custom card header component with title and subtitle.
 * @param {Object} props - Component properties.
 * @param {Object} props.title - Title information containing PropertyAddress, City, State, and ZipCode.
 * @param {string} props.subtitle - Subtitle text.
 * @returns {JSX.Element} - Rendered CardHeader component.
 */
const CardHeader = ({ title, subtitle}) => {
    const theme = useTheme();
    return (
        <Box>
            <Typography 
                variant="h4" 
                color ={theme.palette.secondary[100]} 
                fontWeight="bold" 
                sx={{ mb: "5px" }}
            >
                {title[0].PropertyAddress}, {title[0].City}, {title[0].State} {title[0].ZipCode}
            </Typography>
            <Typography 
                variant="h5" 
                color ={theme.palette.secondary[100]} 
                fontWeight="bold" 
                sx={{ mb: "5px" }}
            >
                {subtitle}
            </Typography>
        </Box>   
    )
}

export default CardHeader
