import {useState} from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Tab, Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, } from '@mui/material';
import { useSelector } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function PropertyTable() {
    // Assuming you have access to property data in your Redux state
    const properties = useSelector((state) => state.db.properties);

    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = (property) => {
        setSelectedProperty(property);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedProperty(null);
        setIsDialogOpen(false);
    };

    // Function to format a number as a dollar value
    const formatDollarValue = (value) => {
        return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        });
    };
  
    return (
        <>
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
                            <Button onClick={() => openDialog(property)}>View</Button>
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

            <Dialog open={isDialogOpen} onClose={closeDialog} PaperProps={{
                style: {
                width: '2000px', // Adjust the width as needed
                margin: '16px',    // Adjust the margin as needed
                },
            }}>
            {selectedProperty && (
            <>
                <DialogTitle>Property Details</DialogTitle>
                <DialogContent>
                {/* Render property details here */}
                <div>
                    <strong>Property Type:</strong> {selectedProperty.PropertyType}
                </div>
                <div>
                    <strong>Address:</strong>{' '}
                    {`${selectedProperty.PropertyAddress}, ${selectedProperty.City}, ${selectedProperty.State} ${selectedProperty.ZipCode}`}
                </div>
                <div>
                    <strong>Bedrooms:</strong> {selectedProperty.Bedroom}
                </div>
                <div>
                    <strong>Bathrooms:</strong> {selectedProperty.Bathroom}
                </div>
                <div>
                    <strong>Latest Sale Price:</strong>{' '}
                    {formatDollarValue(selectedProperty.LatestSalePrice)}
                </div>
                <div>
                    <strong>Latest Sale Date:</strong> {selectedProperty.LatestSaleDate}
                </div>
                </DialogContent>
                <DialogActions>
                <Button onClick={closeDialog} color="primary">
                    Close
                </Button>
                </DialogActions>
            </>
            )}
            </Dialog>
        </>



    );
  }
  
  export default PropertyTable;



      