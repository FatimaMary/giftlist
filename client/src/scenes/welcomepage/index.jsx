import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import Navbar from '../../Components/Navbar';
import { useNavigate } from 'react-router';

function WelcomePage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/signup");
    }
  return (
    <Box>
        <Navbar/>
        <Box 
            m='1.5rem 2.5rem'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                // width: ''
            }}
        >
            <Typography variant='h2'>Gifting made easy</Typography>
            <Typography variant='h6'>GiftList is the easiest way to exchange gifts with friends and family for birthdays, holidays, and more!</Typography>
            <Button variant='contained' onClick={handleClick}>Create a giftlist</Button>
        </Box>
    </Box>
  )
}

export default WelcomePage