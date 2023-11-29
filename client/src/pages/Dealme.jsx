import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import PageHeader from '../components/General/PageHeader';

function Dealme() {
  const navigate = useNavigate()
  
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [user, navigate])
  
  return (
    <Box m="1.5rem 2.5rem">
      <PageHeader title="DealMe" subtitle="Is your lead a good deal?" />

    </Box>
  )
}

export default Dealme