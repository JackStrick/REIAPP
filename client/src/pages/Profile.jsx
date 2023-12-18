import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import profileImage from '../assets/ProfileImage.jpeg';
import PageHeader from '../components/General/PageHeader';
import { useMediaQuery } from '@mui/material';
import { Container, Grid, Stack } from '@mui/material';
import AccountProfile from '../components/Account/AccountProfile';
import AccountDetails from '../components/Account/AccountDetails';



function Profile() {
  const navigate = useNavigate()
  
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [user, navigate])


  const isNonMobile = useMediaQuery("(min-width:1000px)")


  return (
    <Box m="1.5rem 2.5rem">

      <PageHeader title="Profile" subtitle="View your profile" />
      <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>

    </Box>    
  )
}

export default Profile