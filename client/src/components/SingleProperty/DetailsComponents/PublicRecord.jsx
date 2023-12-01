import { Box, Typography, Grid } from '@mui/material'
import React from 'react'

function PublicRecord({property, analytics}) {
    
    
    const formatDollarValue = (value) => {
        return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        });
    };



    return (
        <Box>
            <Grid container spacing={0}>
            {/* First Box (80% width) */}
                <Grid item xs={6}>
                    <Box  p={2} >
                    <Grid container spacing={2} >
                        {/* First column */}
                        <Grid item xs={6} >
                            <Typography variant="h6" marginTop={1}>Primary Owner Full Name:</Typography>
                            <Typography variant="h6" marginTop={1}>Vacant:</Typography>
                            <Typography variant="h6" marginTop={1}>Owner Occupied:</Typography>
                            <Typography variant="h6" marginTop={1}>Last Sold Date:</Typography>
                            <Typography variant="h6" marginTop={1}>Last Sold Amount:</Typography>
                            <Typography variant="h6" marginTop={1}>Last Transfer Date:</Typography>
                            <Typography variant="h6" marginTop={1}>Property Type:</Typography>
                            <Typography variant="h6" marginTop={1}>Year Built:</Typography>
                            <Typography variant="h6" marginTop={1}>Beds:</Typography>
                            <Typography variant="h6" marginTop={1}>Bath:</Typography>
                            <Typography variant="h6" marginTop={1}>Sqft:</Typography>
                            <Typography variant="h6" marginTop={1}>Lot Size (Sqft):</Typography>
                        </Grid>
                        {/* Second column */}
                        <Grid item xs={6}>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{property.OwnerName}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>Unknown</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>Unknown</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{property.LatestSaleDate}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{formatDollarValue(property.LatestSalePrice)}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>Unknown</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{property.PropUsage}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{property.YearBuilt}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{property.Bedroom}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{property.Bathroom}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{property.SquareFoot}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{property.LotSize}</Typography>
                            
                            
                        </Grid>
                    </Grid>
                    </Box>
                </Grid>
            
            {/* Second Box (80% width) */}
                <Grid item xs={6}>
                    <Box  p={2}>
                    <Grid container spacing={2} >
                        {/* First column */}
                        <Grid item xs={6} >
                            <Typography variant="h6" marginTop={1}>Style:</Typography>
                            
                            <Typography variant="h6" marginTop={1}># of Fireplaces:</Typography>
                            <Typography variant="h6" marginTop={1}>Pool:</Typography>
                            <Typography variant="h6" marginTop={1}>Heating:</Typography>
                            <Typography variant="h6" marginTop={1}>Cooling:</Typography>
                            <Typography variant="h6" marginTop={1}>County:</Typography>
                            <Typography variant="h6" marginTop={1}>Neighborhood:</Typography>
                            <Typography variant="h6" marginTop={1}>Elementary School (Rating):</Typography>
                            <Typography variant="h6" marginTop={1}>Middle School (Rating):</Typography>
                            <Typography variant="h6" marginTop={1}>High School (Rating):</Typography>
                            <Typography variant="h6" marginTop={1}>Legal Description:</Typography>
                            
                        </Grid>
                        {/* Second column */}
                        <Grid item xs={6}>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{property.Style}</Typography>
                            
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>Not Reported</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>No Pool</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>Hot Water / Gas</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>Not Reported</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{property.County}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>__________</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{analytics.primarySchool}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{analytics.middleSchool}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{analytics.highSchool}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>Unknown</Typography>
                        </Grid>
                    </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PublicRecord