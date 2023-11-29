import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

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
