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
                height: '90vh',
                width: '100vw',
            }}
            className='boxcomponent'
        >
            <Typography 
                variant='h2'
                sx={{
                    fontWeight:'bold',
                    fontSize: '5rem',
                    color: '#C21010',
                }}
            >
                Gifting made easy
            </Typography>
            <Typography 
                variant='h6'
                sx={{
                    fontSize: '1.5rem',
                    width: '600px',
                    opacity: '0.5',
                    color: '#C21010',
                }} 
            >
                GiftList is the easiest way to exchange gifts with friends and family for birthdays, holidays, and more!
            </Typography>
            <Button 
                variant='contained' 
                onClick={handleClick}
                sx={{
                    background: '#C21010',
                    padding: '10px 15px',
                    borderRadius: '10px',
                    textTransform: 'inherit',
                    fontSize: '1rem',
                    letterSpacing: '1px',
                    color: '#FFF',
                    '&:hover': {
                        background: '#fff',
                        color: '#C21010',
                        border: '1px solid #C21010'
                    }
                }}
            >
                Create a gift list
            </Button>
        </Box>
    </Box>
  )
}

export default WelcomePage