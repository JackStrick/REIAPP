import { useEffect } from 'react'
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

    
    return (
        <div>
          <h1>Leadfind</h1>

          
          <PropertyTable />



        </div>
    )
}

export default Leadfind