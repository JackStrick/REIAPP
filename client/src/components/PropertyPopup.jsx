import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Map from './Map';

import { useEffect, useState } from 'react';

function PropertyPopup({ open, onClose, property }) {
  

    // Function to format a number as a dollar value
    const formatDollarValue = (value) => {
        return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        });
    };

  // You can customize the dialog content and layout here based on the property data.
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{
        style: {
          width: '80%', // Adjust the width as needed was 2000px
          margin: '16px',    // Adjust the margin as needed
        },
      }}>
        <Map property={property} />
        <DialogTitle>Property Details</DialogTitle>
        <DialogContent>
              <div>
                <strong>Property Type:</strong> {property.PropertyType}
              </div>
              <div>
                <strong>Address:</strong>{' '}
                {`${property.PropertyAddress}, ${property.City}, ${property.State} ${property.ZipCode}`}
              </div>
              <div>
                <strong>Bedrooms:</strong> {property.Bedroom}
              </div>
              <div>
                <strong>Bathrooms:</strong> {property.Bathroom}
              </div>
              <div>
                <strong>Latest Sale Price:</strong>{' '}
                {formatDollarValue(property.LatestSalePrice)}
              </div>
              <div>
                <strong>Latest Sale Date:</strong> {property.LatestSaleDate}
              </div>
            </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PropertyPopup;



{/* <Dialog open={isDialogOpen} onClose={closeDialog}
PaperProps={{
    style: {
      maxWidth: '800px', // Adjust the width as needed
      margin: '16px',    // Adjust the margin as needed
    },
  }}>
        {property && (
          <>
            <DialogTitle>Property Details</DialogTitle>
            <DialogContent>
              {/* Render property details here 
              <div>
                <strong>Property Type:</strong> {property.PropertyType}
              </div>
              <div>
                <strong>Address:</strong>{' '}
                {`${property.PropertyAddress}, ${property.City}, ${property.State} ${property.ZipCode}`}
              </div>
              <div>
                <strong>Bedrooms:</strong> {property.Bedroom}
              </div>
              <div>
                <strong>Bathrooms:</strong> {property.Bathroom}
              </div>
              <div>
                <strong>Latest Sale Price:</strong>{' '}
                {formatDollarValue(property.LatestSalePrice)}
              </div>
              <div>
                <strong>Latest Sale Date:</strong> {property.LatestSaleDate}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog> */}
