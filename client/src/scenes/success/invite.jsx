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
            <Typography>Add email address</Typography>
            <Button>X</Button>
        </Box>
        <Box></Box>
    </Box>
  </Box>
}

export default Invite