import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropertyTable from '../components/MultiProperty/PropertyTable';
import { fetchUserProperties } from '../features/api/dbSlice';
import { Dialog, Box, Typography, Stack } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import PageHeader from '../components/General/PageHeader';


function Properties() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [properties, setProperties] = useState([]);
  const dispatch = useDispatch();
   
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  

  useEffect(() => {
    if (user) {
      // Fetch user properties using the user's ID
      dispatch(fetchUserProperties(user._id))
        .unwrap()
        .then((response) => {
          // Update the properties state with the fetched data
          setProperties(response);
          console.log("ALL OF THE USER PROPERTIES: ", response)
        })
        .catch((error) => {
          // Handle any errors, e.g., show an error message
          console.error('Error fetching user properties:', error);
        });
    }
  }, [user, dispatch]);

  {/*if (!properties || properties.length == 0)
  {
    return (
      <div>
        <Dialog PaperProps={{
        style: {
          width: '80%', // Adjust the width as needed was 2000px
          margin: '16px',    // Adjust the margin as needed
        },
      }}>
          <DialogTitle>Saved Properties</DialogTitle>
          <DialogContent>
                <div>
                  <strong>You have not added any leads to your property list</strong>
                </div>
          </DialogContent>
          <DialogActions>
          <Button color="primary">
            Add Properties
          </Button>
        </DialogActions>
        </Dialog>
      </div>
    );
  }*/}

  return (

    <Box m="1.5rem 2.5rem">

      <PageHeader title="Saved Leads" subtitle="" />

      <Stack spacing={2}>
        {properties.filter(property => property.PropertyType === 'Absentee Owner') && <PropertyTable properties={properties.filter(property => property.PropertyType === 'Absentee Owner')} name="Absentee Owner"/>}

        {properties.filter(property => property.PropertyType === 'Foreclosure') && <PropertyTable properties={properties.filter(property => property.PropertyType === 'Foreclosure')} name="Foreclosure" />}
       
        {properties && <PropertyTable properties={properties.filter(property => property.PropertyType === 'Probate')} name={"Probate"} />}
      </Stack>
      


    </Box>
   
  );
}

export default Properties;
