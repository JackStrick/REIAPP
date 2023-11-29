import React from 'react'
import { Box, Typography, Chip } from '@mui/material'
import StatBox from '../Misc/StatBox'
import { useTheme } from '@emotion/react'
import PropAnalyticsBox from '../Misc/PropAnalyticsBox'

function PropertyAnalytics({property}) {
    const theme = useTheme();
    
    return (
        <Box m="1.5rem 2.5rem">
            <Typography 
                variant="h6" 
                color ={theme.palette.secondary[100]} 
                fontWeight="bold" 
                sx={{ mb: "5px" }}
                >
                    PROPERTY ANALYTICS
            </Typography>
            <Box 
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                
            >
                <Box 
                    gridColumn="span 2"
                    gridRow="span 1"
                >
                    <PropAnalyticsBox title1="ESTIMATED VALUE" title2="+/- PREV MONTH" value1="$823.7k" value2="+$2.8K"/>
                </Box>
                <Box 
                    gridColumn="span 2"
                    gridRow="span 1"
                >
                    <PropAnalyticsBox title1="POTENTIAL EQUITY" title2="EST LOAN BALANCE" value1="$823.7k" value2="+$2.8K"/>
                </Box>
                <Box 
                    gridColumn="span 2"
                    gridRow="span 1"
                >
                    <PropAnalyticsBox title1="DIFF +/- MEDIAN PRICE" title2="EST MORTGAGE PAYMENT" value1="$823.7k" value2="+$2.8K"/>
                </Box>     
                <Box 
                    gridColumn="span 2"
                    gridRow="span 1"
                >
                    <PropAnalyticsBox title1="RENT ZESTIMATE" title2="POTENTIAL CASHFLOW" value1="$823.7k" value2="+$2.8K"/>
                </Box>  
                <Box 
                    gridColumn="span 2"
                    gridRow="span 1"
                >
                    <PropAnalyticsBox title1="LAST SOLD DATE" title2="PRIMARY SCHOOL RATING" value1="$823.7k" value2="+$2.8K"/>
                </Box>  
                <Box 
                    gridColumn="span 2"
                    gridRow="span 1"
                >
                    <PropAnalyticsBox title1="MIDDLE SCHOOL RATING" title2="HIGH SCHOOL RATING" value1="$823.7k" value2="+$2.8K"/>
                </Box>        
                    
                    
                


            </Box>
        
        
        
        
        </Box>
    )
}

export default PropertyAnalytics