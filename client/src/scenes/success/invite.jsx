import React from 'react';
import { 
    Box, 
    Typography, 
    Button 
} from '@mui/material';
import CopyInvitation from '../copyinvitation';

function Invite() {
  return <Box
    sx={{
        margin: '0 auto',
        display: 'flex',
        // width: '800px',
        
    }}
  >
    <Box 
        sx={{
            background: '#fff',
            boxShadow: '5px 5px 25px -5px rgba(32, 32, 36, .1)',
            borderRadius: '10px',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            width: '500px',
            justifyContent: 'center',
        }}
    >
            <CopyInvitation />
        <Box></Box>
    </Box>
  </Box>
}

export default Invite