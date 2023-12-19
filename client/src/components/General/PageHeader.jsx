import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

/**
 * PageHeader component to display a title and subtitle.
 * @param {Object} props - React component properties.
 * @param {string} props.title - The title to be displayed.
 * @param {string} props.subtitle - The subtitle to be displayed.
 * @returns {JSX.Element} - Rendered PageHeader component.
 */
const PageHeader = ({ title, subtitle }) => {
    const theme = useTheme();
    return (
        <Box>
            <Typography 
                variant="h2" 
                color ={theme.palette.secondary[100]} 
                fontWeight="bold" 
                sx={{ mb: "5px" }}
            >
                {title}
            </Typography>
            <Typography 
                variant="h6" 
                color ={theme.palette.secondary[100]} 
                sx={{ mb: "5px" }}
            >
                {subtitle}
            </Typography>
        </Box>   
    )
}

export default PageHeader
