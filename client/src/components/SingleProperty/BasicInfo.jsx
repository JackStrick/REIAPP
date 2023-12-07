import React from 'react'
import PageHeader from '../General/PageHeader'
import CardHeader from '../General/CardHeader'
import Map from '../General/Map'
import { Box, Typography, Chip } from '@mui/material'
import StatBox from '../Misc/StatBox'


function BasicInfo({property}) {
    console.log(property)
    
    
    return (
        <Box m="1.5rem 2.5rem">
            <Box 
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                
            >
                <Box
                    gridColumn="span 3"
                    gridRow="span 1"
                    //backgroundColor={theme.palette.background.alt}
                    p="1rem"
                    borderRadius="0.55rem"
                >
                    <CardHeader title={[property]} subtitle={property.PropUsage}/>
                    <Typography variant="h6" color="text.secondary" fontWeight="bold" sx={{ mb: "5px" }}>{property.Bedroom} Bed | {property.Bathroom} Bath | {property.SquareFoot} Sqft</Typography>
                    <Chip sx={{ marginTop: 1}} label={property.PropertyType}/>

                    <Box sx={{ marginTop: 5}} flexDirection="column">
                        <StatBox  title="Primary Contact" value={property.OwnerName}/>
                
                    </Box>
                    
                </Box>
                <Box
                    gridColumn="span 9"
                    gridRow="span 2"
                    //backgroundColor={theme.palette.background.alt}
                    p="1rem"
                    borderRadius="0.55rem"
                >
                    <Map properties={[property]} />
                </Box>


            </Box>
            

        </Box>
        
    )
}

export default BasicInfo