import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserProperties, deleteUserProperty, createUserProperty } from '../../features/api/dbSlice';
import PageHeader from '../General/PageHeader'
import CardHeader from '../General/CardHeader'
import Map from '../General/Map'
import { Box, Typography, Chip, useTheme } from '@mui/material'
import StatBox from '../Misc/StatBox'
import FavoriteButton from '../Misc/FavoriteButton'


function BasicInfo({property}) {
    const theme = useTheme();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [userProperties, setUserProperties] = useState([]);
    

    useEffect(() => {
        const getUserProperties = async () => {
            const response = await dispatch(fetchUserProperties(user._id));
            const updatedUserProperties = response.payload || [];
            setUserProperties(updatedUserProperties);
        };

        if (user) {
            getUserProperties();
        }
    }, [user, dispatch]);


    const togglePropertyFavorite = async (property) => {
        console.log('togglePropertyFavorite', property._id);
        if (isPropertyInUserProperties(property)) {
            await dispatch(deleteUserProperty({ userId: user._id, propertyId: property._id }));
        } else {
            await dispatch(createUserProperty({ userId: user._id, propertyId: property._id }));
        }

        const response = await dispatch(fetchUserProperties(user._id));
        const updatedUserProperties = response.payload || [];
        setUserProperties(updatedUserProperties);
    };

    const isPropertyInUserProperties = (property) => {
        return userProperties.some((userProperty) => userProperty._id === property._id);
    };
    
    
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
                    <FavoriteButton 
                        property={property}
                        isFavorite={isPropertyInUserProperties(property)}
                        onToggle={togglePropertyFavorite}
                        sx={{marginTop: 1}} 
                    />

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