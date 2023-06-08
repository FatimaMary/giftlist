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
            // m='1.5rem 2.5rem'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                height: '100vh',
                width: '100vw',
            }}
            className='boxcomponent'
        >
            <Typography 
                variant='h2'
            >
                Gifting made easy
            </Typography>
            <Typography 
                variant='h6'
                sx={{
                    fontSize: '1.5rem',
                    width: '600px',
                    opacity: '0.5'
                }} 
            >
                GiftList is the easiest way to exchange gifts with friends and family for birthdays, holidays, and more!
            </Typography>
            <Button 
                variant='contained' 
                onClick={handleClick}
                sx={{
                    background: '#2B2A4C',
                    padding: '10px 15px',
                    borderRadius: '10px',
                    textTransform: 'inherit',
                    fontSize: '1rem',
                    letterSpacing: '1px',
                }}
            >
                Create a gift list
            </Button>
        </Box>
    </Box>
  )
}

export default WelcomePage