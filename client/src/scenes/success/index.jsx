import React, { useState } from 'react';
import { 
    Box,
    Typography,
    Button
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Light from './light.png';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

function Success() {
    const [searchParam] = useSearchParams();
    const userId = searchParam.get("userId");
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/giftexchange?userId=${userId}`)
      }

  return <Box 
    backgroundColor='#e8ecf1'
    width='100vw'
    p='50px 30px 33px 30px'
    > 
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem',
            }}
            onClick={handleClick}
        >
            <ArrowCircleLeftOutlinedIcon 
                sx={{
                fontSize: '1.2rem',
                color: '#0f7b9b'
                }}
            />
            <Button
                sx={{
                textTransform: 'inherit',
                color: '#0f7b9b',
                fontWeight: 'bold',
                fontSize: '1rem'
                }}
            >
                Gift exchange
            </Button>
        </Box>
    </Box>
}

export default Success