// PropertyTable.js
import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, useTheme, Typography, TableFooter, TablePagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProperties, deleteUserProperty, createUserProperty } from '../../features/api/dbSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropertyPopup from '../SingleProperty/PropertyPopup'; // Import the PropertyPopup component
import FavoriteButton from '../Misc/FavoriteButton';
import { Navigate } from 'react-router-dom';
import Map from '../General/Map';


function PropertyTable({ properties, name }) {
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
        //setSelectedProperty(property);
        
    };

    const handleRowClick = (property) => {
        window.location.href = `/properties/${property._id}`;
    };

    const formatDollarValue = (value) => {
        return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        });
    };

    return (
        <div>
            <Typography variant="h3" fontWeight="bold" sx={{ mb: "5px" }} gutterBottom >{name}</Typography>
            <TableContainer component={Paper}>
                <Table color='inherit'>
                <TableHead>
                    <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>State</TableCell>
                        <TableCell>Zip</TableCell>
                        <TableCell>Latest Sale Price</TableCell>
                        <TableCell>Lead Type</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {properties.map((property) => (
                    <TableRow key={property._id}>
                        <TableCell onClick={() => handleRowClick(property)} sx={{ ':hover': {cursor:'pointer', textDecoration: 'underline' }}}>{property.PropertyAddress}</TableCell>
                        <TableCell>{property.City}</TableCell>
                        <TableCell>{property.State}</TableCell>
                        <TableCell>{property.ZipCode}</TableCell>
                        <TableCell>{formatDollarValue(property.LatestSalePrice)}</TableCell>
                        <TableCell>{property.PropertyType}</TableCell>
                        
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            {selectedProperty && <Map properties={[selectedProperty]} />}
        </div>
    );
    }

    export default PropertyTable;
