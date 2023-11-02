import {useState} from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Tab, Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, } from '@mui/material';
import { useSelector } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PropertyPopup from './PropertyPopup'; // Import the PropertyPopup component


function PropertyTable({properties}) {
    // Assuming you have access to property data in your Redux state
    //const properties = useSelector((state) => state.db.properties);

    const [selectedProperty, setSelectedProperty] = useState(null);
    //const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleViewClick = (property) => {
        setSelectedProperty(property);
      };
    
      const handleClosePopup = () => {
        setSelectedProperty(null);
      };

    // Function to format a number as a dollar value
    const formatDollarValue = (value) => {
        return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        });
    };
  
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Property Type</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Bedrooms</TableCell>
                    <TableCell>Bathrooms</TableCell>
                    <TableCell>Latest Sale Price</TableCell>
                    <TableCell>Latest Sale Date</TableCell>
                    <TableCell>Actions</TableCell>
                    {/* Add more table headers for other property attributes */}
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
                            <Button>
                                <FavoriteBorderIcon />
                            </Button>
                        </TableCell>
                        {/* Add more table cells for other property attributes */}
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



      