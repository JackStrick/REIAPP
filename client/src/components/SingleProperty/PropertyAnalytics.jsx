import React from 'react'
import { Box, Typography, Chip } from '@mui/material'
import StatBox from '../Misc/StatBox'
import { useTheme } from '@emotion/react'
import PropAnalyticsBox from '../Misc/PropAnalyticsBox'





function PropertyAnalytics({analytics}) {
    const theme = useTheme();

    const formatDollarValue = (value) => {
        const numericValue = parseFloat(value);
        let divisor = 1000;
        if (numericValue > 1000000 || numericValue < -1000000) {
            divisor = 1000000;
        }
        if (numericValue > 1000 || numericValue < -1000) {
            const formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
            }).format(numericValue / divisor);
        
            if (divisor > 1000) {
                return `${formattedValue}M`
            }
            
            return `${formattedValue}K`
        } 
        else {
            return `$${numericValue}`
        }
        
      };

    const quickDollarValue = (value) => {
        const numericValue = parseFloat(value);
        return numericValue.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
        });
    };
    
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
                    <PropAnalyticsBox title1="ESTIMATED VALUE" title2="+/- PREV MONTH" value1={formatDollarValue(analytics.estimatedValue)} value2={formatDollarValue(analytics.valuePrevMonth)}/>
                </Box>
                <Box 
                    gridColumn="span 2"
                    gridRow="span 1"
                >
                    <PropAnalyticsBox title1="POTENTIAL EQUITY" title2="EST LOAN BALANCE" value1={formatDollarValue(analytics.potentialEquity)} value2={formatDollarValue(analytics.estimatedLoanBalance)}/>
                </Box>
                <Box 
                    gridColumn="span 2"
                    gridRow="span 1"
                >
                    <PropAnalyticsBox title1="DIFF +/- MEDIAN PRICE" title2="EST MORTGAGE PAYMENT" value1={formatDollarValue(analytics.medianPrice)} value2={quickDollarValue(analytics.estimatedMortgage)}/>
                </Box>     
                <Box 
                    gridColumn="span 2"
                    gridRow="span 1"
                >
                    <PropAnalyticsBox title1="RENT ZESTIMATE" title2="POTENTIAL CASHFLOW" value1={quickDollarValue(analytics.rentZestimate)} value2={quickDollarValue(analytics.potentialCashFlow)}/>
                </Box>  
                <Box 
                    gridColumn="span 2"
                    gridRow="span 1"
                >
                    <PropAnalyticsBox title1="LAST SOLD DATE" title2="PRIMARY SCHOOL RATING" value1={analytics.lastSoldDate} value2={analytics.primarySchool}/>
                </Box>  
                <Box 
                    gridColumn="span 2"
                    gridRow="span 1"
                >
                    <PropAnalyticsBox title1="MIDDLE SCHOOL RATING" title2="HIGH SCHOOL RATING" value1={analytics.middleSchool} value2={analytics.highSchool}/>
                </Box>        
                    
                    
                


            </Box>
        
        
        
        
        </Box>
    )
}

export default PropertyAnalytics