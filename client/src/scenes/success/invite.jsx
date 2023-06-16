import React from 'react';
import { 
    Box, 
    Typography, 
    Button 
} from '@mui/material';

function Invite() {
  return <Box
    sx={{
        margin: '0 361px',
        display: 'flex',
    }}
  >
    <Box 
        sx={{
            background: '#fff',
            border: '1px solid #cad3dd',
            boxShadow: '5px 5px 25px -5px rgba(32, 32, 36, .1)',
            borderRadius: '10px',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        }}
    >
        <Box 
            sx={{
                padding:'0 0 16px',
                borderBottom: '1px solid #e8ecf1',
                flexWrap: 'wrap',
                display: 'flex',
                flexShrink: 0,
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <Typography
                variant='h4'
                sx={{
                    fontWeight: 600,
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: '#101a34',
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}
            >Add email address</Typography>
            <Button
                sx={{
                    boxSizing: 'border-box',
                    display: 'inline-block',
                    overflow: 'hidden',
                    width: 'initial',
                    height: 'initial',
                    opacity: 1,
                    maxWidth: '100%',
                }}
            >X</Button>
        </Box>
        <Box></Box>
    </Box>
  </Box>
}

export default Invite