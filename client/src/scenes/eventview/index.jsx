import React from 'react';
import { 
    Box,
    Typography,
    Button,
 } from '@mui/material';
 import Santa from '../giftExchange/santa1.png';
 import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function EventView() {
    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }

    function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }
  return <Box 
    backgroundColor='#e8ecf1'
    width='100vw'
    p='50px 30px 33px 30px'
    >
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
            }}
        >
            <Box>
                <img 
                    src={Santa} 
                    alt='santa image' 
                    height={250} 
                    width={250}
                    className='starimage'
                />
            </Box>
            <Box sx={{
                background: '#fff',
                border: '1px solid #e8ecf1',
                borderRadius: '10px',
                maxWidth: '700px'
            }}>
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                    }}
                >
                    <Typography>Exchange gifts by: Date</Typography>
                    <Typography>RSVP by: Date</Typography>
                    <Typography>Gift budget: Amount </Typography>
                </Box>
                <Box>
                    <Avatar {...stringAvatar('Fatima Mary')} />
                </Box>
            </Box>
        </Box>
    </Box>
}

export default EventView