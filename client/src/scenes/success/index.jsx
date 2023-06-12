import React, { useState } from 'react';
import { 
    Box,
    Typography,
    Button
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Light from './light.png';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import Footer from '../../Components/Footer';

function Success() {
    const [searchParam] = useSearchParams();
    const userId = searchParam.get("userId");
    const eventId = searchParam.get("eventId");
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/giftexchange?userId=${userId}`)
      }

    const moveToEventview = () => {
        navigate(`/eventview?eventId=${eventId}`);
    }

    const moveToInvitepage = () => {
        navigate(`/invite`)
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
        <Box 
            sx={{
                minHeight: '80vh',
                background: '#fff',
                border: '1px solid #e8ecf1',
                borderRadius: '10px'
            }}
        >
            <Box 
                sx={{
                maxWidth: '517px',
                margin: '0 auto',
                padding: '48px 10px 16px',
                }}
            >
                <Box 
                    sx={{
                        paddingBottom: '28px',
                        marginBottom: '28px',
                        borderBottom: '1px solid #cad3dd',
                        textAlign: 'center'
                    }}
                >
                    <img 
                        src={Light} 
                        alt='Light image' 
                        height={100} 
                        width={100}
                        className='starimage'
                    />
                    <Typography
                        variant='h4'
                    >
                        Your event has been created!
                    </Typography>
                    <Typography 
                        sx={{
                            margin:'0 0 10px',
                        }}
                    >
                        Gift exchanges need at least 3 participants
                    </Typography>
                </Box>
                <Box>
                    <Button 
                    onClick={moveToInvitepage}
                    variant='contained'
                    sx={{ 
                        border: '1px solid grey',
                        borderRadius: '10px',
                        width: '100%',
                        fontSize: '1rem',
                        color: '#0f7b9b',
                        background: '#e8ecf1',
                        textTransform: 'inherit',
                        fontWeight:'bold',
                        '&:hover': {
                        backgroundColor: '#0f7b9b',
                        color: 'white',
                        border: '1px solid #0f7b9b'
                        },
                        marginTop: '10px'
                    }}
                    >
                    Invite more people
                    </Button>
                </Box>
                <Box>
                    <Button 
                    onClick={moveToEventview}
                    variant='contained'
                    sx={{ 
                        border: '2px solid skyblue',
                        borderRadius: '10px',
                        width: '100%',
                        fontSize: '1rem',
                        color: 'white',
                        background: 'skyblue',
                        textTransform: 'inherit',
                        fontWeight:'bold',
                        '&:hover': {
                        backgroundColor: 'white',
                        color: 'skyblue',
                        border: '1px solid #0f7b9b'
                        },
                        marginTop: '10px',
                        marginBottom: '20px',
                    }}
                    >
                    View Gift exchange
                    </Button>
                </Box>
            </Box>
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '5px solid skyblue',
                    paddingBottom: '20px'
                }}
            >
                <Typography>Success</Typography>
            </Box>
        </Box>
        <Footer/>
    </Box>
}

export default Success