// PropertyTable.js
import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProperties, deleteUserProperty, createUserProperty } from '../features/api/dbSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropertyPopup from './PropertyPopup'; // Import the PropertyPopup component
import FavoriteButton from './FavoriteButton';

function PropertyTable({ properties }) {
    const theme = useTheme();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [selectedProperty, setSelectedProperty] = useState(null);
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

    const handleViewClick = (property) => {
        setSelectedProperty(property);
    };

    const formatDollarValue = (value) => {
        return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        });
    };

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
        <div>
        <TableContainer component={Paper}>
            <Table color='inherit'>
            <TableHead>
                <TableRow>
                <TableCell>Property Type</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Bedrooms</TableCell>
                <TableCell>Bathrooms</TableCell>
                <TableCell>Latest Sale Price</TableCell>
                <TableCell>Latest Sale Date</TableCell>
                <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {properties.map((property) => (
                <TableRow key={property._id}>
                    <TableCell>{property.PropertyType}</TableCell>
                    <TableCell>{property.PropertyAddress + ', ' + property.City + ', ' + property.State + ' ' + property.ZipCode}</TableCell>
                    <TableCell>{property.Bedroom}</TableCell>
                    <TableCell>{property.Bathroom}</TableCell>
                    <TableCell>{formatDollarValue(property.LatestSalePrice)}</TableCell>
                    <TableCell>{property.LatestSaleDate}</TableCell>
                    <TableCell>
                    <Button onClick={() => handleViewClick(property)}>View</Button>
                    <FavoriteButton
                        property={property}
                        isFavorite={isPropertyInUserProperties(property)}
                        onToggle={togglePropertyFavorite}
                    />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        {selectedProperty && (
            <PropertyPopup open={true} onClose={() => setSelectedProperty(null)} property={selectedProperty} />
        )}
        </div>
    );
    }

    export default PropertyTable;
