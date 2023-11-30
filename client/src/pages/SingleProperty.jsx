import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { fetchPropertyById, fetchPropertyAnalytics } from '../features/api/dbSlice';
import PropertyAnalytics from '../components/SingleProperty/PropertyAnalytics';
import BasicInfo from '../components/SingleProperty/BasicInfo';
import { Box, Button, useMediaQuery, Typography, Card } from '@mui/material'
import Spinner from '../components/Misc/Spinner';

function SingleProperty() {
    const { user } = useSelector((state) => state.auth);
    const { propertyId } = useParams();
    const dispatch = useDispatch();
    const [property, setProperty] = useState(null);
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const getPropertyInfo = async () => {
            const propData = await dispatch(fetchPropertyById(propertyId));
            const property = propData.payload || [];
            setProperty(property);
    
            const propAnalytics = await dispatch(fetchPropertyAnalytics(property.zpid));
            const analytics = propAnalytics.payload || [];
            setAnalytics(analytics[0]);
        }

        if (user) {
            getPropertyInfo();
        }

    }, [user, propertyId, dispatch])

    if (!property || !analytics) {
        return (
            <Spinner />
        );
    }

    return (
        <Box m="1.5rem 2.5rem">
            <Card variant='outlined'>
                <BasicInfo property={property} />
            </Card>
            <Card sx={{marginTop: 3}} variant='outlined'>
                <PropertyAnalytics analytics={analytics} />
            </Card>

           
            
            
            

            
        </Box>
        
        
    )
}

export default SingleProperty;