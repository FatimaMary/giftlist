import React from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { 
    Box, 
    Button, 
    TextField, 
    ThemeProvider, 
    Typography,
    createTheme,
  } from '@mui/material';

function Footer() {
  return <Box sx={{
    display: 'flex',
    justifyContent:'space-between',
    borderTop: '1px solid grey',
    marginTop: '20px',
  }}>
    <Box sx={{
      display: 'flex',
      paddingTop: '10px',
    }}
    >
      <CopyrightIcon 
        sx={{
          fontSize: '16px'
        }} 
      />
      <Typography sx={{
          fontSize: '13px',
          color: '#F11299',
        }} 
      >
        GiftList. All Rights Reserved
      </Typography>
    </Box>
    <Box>
      <Button 
        sx={{
          textTransform: 'inherit',
           color: '#F11299',
          '&:hover': {
            cursor: 'pointer',
            color: 'skyblue',
            background: 'transparent'
          },
        }}
      >
        Privacy policy
      </Button>
      <Button
        sx={{
          textTransform: 'inherit',
           color: '#F11299',
          '&:hover': {
            cursor: 'pointer',
            color: 'skyblue',
            background: 'transparent'
          },
        }}
      >
        Terms of use
      </Button>
      <Button
        sx={{
          textTransform: 'inherit',
           color: '#F11299',
          '&:hover': {
            cursor: 'pointer',
            color: 'skyblue',
            background: 'transparent'
          },
        }}
      >
        Desclaimer
      </Button>
      <Button 
        sx={{
          textTransform: 'inherit',
           color: '#F11299',
          '&:hover': {
            cursor: 'pointer',
            color: 'skyblue',
            background: 'transparent'
          },
        }}
      >
        Contact Us
      </Button>
    </Box>
  </Box>
}

export default Footer