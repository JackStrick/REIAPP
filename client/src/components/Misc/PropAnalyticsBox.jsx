import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import FlexBetween from './FlexBetween'
import { useSelector } from 'react-redux';

const StatBox = ({ title1, title2, value1, value2}) => {
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
      backgroundColor={mode === 'dark' ? theme.palette.neutral.light : theme.palette.grey[200]}
      borderRadius="0.55rem"
      hover="pointer"
        sx={{"&:hover": {
            backgroundColor: (mode === 'dark' ? theme.palette.grey[900] : theme.palette.neutral.light),
        }}}
    >
    

        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            {title1}
        </Typography>
        <Typography
            variant="h3"
            fontWeight="600"
            sx={{ color: theme.palette.secondary[200] }}
        >
            {value1}
        </Typography>

        <hr style={{
            color: "#0097ff",
            backgroundColor: "#0097ff",
            height: 1,
            width: '100%'
        }}/>

        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            {title2}
        </Typography>
        <Typography
            variant="h3"
            fontWeight="600"
            sx={{ color: theme.palette.secondary[200] }}
        >
            {value2}
        </Typography>
    </Box>
  );
};

export default StatBox;