import React, { useState } from 'react'
import { Box, Typography, useTheme, Tabs, Tab } from '@mui/material'
import PublicRecord from './DetailsComponents/PublicRecord';
import TaxInfo from './DetailsComponents/TaxInfo';
import MortgageInfo from './DetailsComponents/MortgageInfo';


function PropertyDetails({property, analytics}) {
    const theme = useTheme();
    const [value, setValue] = useState("public");
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <Box m="1.5rem 2.5rem">
            <Typography 
                variant="h6" 
                color ={theme.palette.secondary[100]} 
                fontWeight="bold" 
                sx={{ mb: "5px" }}
                >
                    PROPERTY DETAILS
            </Typography>
            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
            >
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }} gridRow={"span 3"} gridColumn={"span 12"}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="PUBLIC RECORD" value={"public"} />
                        <Tab label="TAX INFO" value={"tax"}/>
                        <Tab label="MORTGAGE INFO" value={"mortgage"}/>
                        
                    </Tabs>
                    <Box m="1.5rem 20rem" >
                        {value === "public" &&  <PublicRecord property={property} analytics={analytics}/>}
                        {value === "tax" &&  <TaxInfo property={property} analytics={analytics}/>}
                        {value === "mortgage" &&  <MortgageInfo property={property} analytics={analytics}/>}
                        
                    </Box>
                </Box>




            </Box>
            
            


        </Box>
    )
}

export default PropertyDetails