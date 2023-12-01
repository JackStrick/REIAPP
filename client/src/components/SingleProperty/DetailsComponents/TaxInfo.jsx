import { Box, Typography, Grid } from '@mui/material'
import React from 'react'

function TaxInfo({property, analytics}) {
    
    const getCurrentYear = () => {
        const date = new Date();
        const year = date.getFullYear();
        return year;
    };

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
                    <Box  p={2}>
                    <Grid container spacing={2} >
                        {/* First column */}
                        <Grid item xs={6} >
                            <Typography variant="h6" marginTop={1}>Parcel #:</Typography>
                            <Typography variant="h6" marginTop={1}>County:</Typography>
                            <Typography variant="h6" marginTop={1}>Primary Owner Full Name:</Typography>
                            <Typography variant="h6" marginTop={1}>Secondary Owner:</Typography>
                            <Typography variant="h6" marginTop={1}>Mailing Address:</Typography>
                            
                            
                            
                            
                        </Grid>
                        {/* Second column */}
                        <Grid item xs={6}>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>Unknown</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{property.County}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{property.OwnerName}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>No</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{property.PropertyAddress}</Typography>
                            <Typography variant="h6" marginTop={0} fontWeight={"bold"}>{property.City}, {property.State} {property.ZipCode}</Typography>
                            
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
                            <Typography variant="h6" marginTop={1}>Tax Year:</Typography>
                            <Typography variant="h6" marginTop={1}>Tax Amount:</Typography>
                            <Typography variant="h6" marginTop={1}>Assessed Value:</Typography>
                            <Typography variant="h6" marginTop={1}>Market Improvement Value:</Typography>
                            <Typography variant="h6" marginTop={1}>Market Value:</Typography>
                        </Grid>
                        {/* Second column */}
                        <Grid item xs={6}>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{getCurrentYear()}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{formatDollarValue(property.TaxAmount)}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>{formatDollarValue(property.AssessedValue)}</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>Not Reported</Typography>
                            <Typography variant="h6" marginTop={1} fontWeight={"bold"}>Not Reported</Typography>
                        </Grid>
                    </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TaxInfo