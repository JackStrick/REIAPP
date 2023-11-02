import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropertyTable from '../components/PropertyTable';

function Leadfind() {
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    

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
    
    return (
        <div>
          <h1>Leadfind</h1>

          
          <PropertyTable properties={properties}/>



        </div>
    )
}

export default Leadfind