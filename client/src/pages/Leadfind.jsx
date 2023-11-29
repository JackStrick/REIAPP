import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropertyTable from '../components/MultiProperty/PropertyTable';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PageHeader from '../components/General/PageHeader';
import FlexBetween from '../components/Misc/FlexBetween';


function Leadfind() {
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    const [type, setType] = useState("All");
    

    const handleChange = (event) => {
      setType(event.target.value);
    };


    useEffect(() => {
        if(!user){
          navigate('/login')
        }
      }, [user, navigate])

    const fetchedProperties = useSelector((state) => state.db.properties);
    const [properties, setProperties] = useState([]); // State to store properties
  
    useEffect(() => {

      setProperties(fetchedProperties);

    }, [fetchedProperties]);
    

    useEffect(() => {
      let filteredProperties = [...fetchedProperties];

      if (type === "Absentee") {
        filteredProperties = fetchedProperties.filter(property => property.PropertyType === "Absentee Owner")
      }
      else if (type === "Foreclosure") {
        filteredProperties = fetchedProperties.filter(property => property.PropertyType === "Foreclosure")
      }
      else if (type === "Probate") {
        filteredProperties = fetchedProperties.filter(property => property.PropertyType === "Probate")
      }
      
      setProperties(filteredProperties);
    }, [type, fetchedProperties]);

    
    return (

      <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <PageHeader title="Lead-Find" subtitle="Find potential properties for investment" />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="select-lead-type-small-label">Lead Type</InputLabel>
            <Select
              labelId="select-lead-type-small-label"
              id="select-lead-type-small"
              value={type}
              label="Lead Type"
              onChange={handleChange}
            >
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              <MenuItem value={"Absentee"}>Absentee Owner</MenuItem>
              <MenuItem value={"Foreclosure"}>Foreclosure</MenuItem>
              <MenuItem value={"Probate"}>Probate</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>

        <PropertyTable properties={properties}/>

      </Box>  
    )
}

export default Leadfind