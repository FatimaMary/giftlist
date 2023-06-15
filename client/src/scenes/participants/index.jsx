import React from 'react';
import { 
    Box, 
    Typography, 
    Button,
} from '@mui/material';
import Tick from './tickic.svg';

function Participants() {
  return <Box sx={{
    padding: '15px 0',
    display: 'flex',
    flexWrap: 'wrap',
  }}>
    <Box sx={{width: '272px'}}>
        <Box
          sx={{
            padding: '24px 16px',
            background: '#fff',
            border: '1px solid #e8ecf1',
            borderRadius: '10px',
            color: '#101a34',
            lineHeight: '25px',
          }}
        >
            <Box 
                sx = {{
                    display: 'flex', 
                    alignItems: 'center'
                }}
            >
                <img 
                    src={Tick} 
                    style={{
                        width: '18px', 
                        height: '18px', 
                        marginRight: '6px'
                    }} 
                />
                <Typography
                    
                >Participating()</Typography>
            </Box>
        </Box>
    </Box>
    <Box></Box>
  </Box>
}

export default Participants