import React, { useEffect, useState } from 'react';
import { 
    Box,
    Typography,
    Button,
    createTheme
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Light from './light.png';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import Footer from '../../Components/Footer';
import CopyInvitation from '../copyinvitation';
import axios from 'axios';

function Success() {
    const [show, setShow] = useState(false);
    const [eventDetails, setEventDetails] = useState([]);
    const [user, setUser] = useState([]);
    const [searchParam] = useSearchParams();
    const userId = searchParam.get("userId");
    const eventId = searchParam.get("eventId");
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/giftexchange?userId=${userId}`)
      }

    const moveToEventview = () => {
        navigate(`/eventview?eventId=${eventId}&userId=${userId}`);
    }

    const moveToInvitepage = () => {
        setShow(true);
    }
    useEffect(() => {
     axios.get(`http://localhost:2309/event/get/${eventId}`)
        .then((response) => {
            setEventDetails(response.data);
        });
    axios.get(`http://localhost:2309/event/user/${eventId}`)
        .then((response) => {
            setUser(response.data);
        })
    }, [])
    
  return <Box 
    backgroundColor='#FFEAEA'
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
                color: '#F11299'
                }}
            />
            <Button
                sx={{
                textTransform: 'inherit',
                color: '#F11299',
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
                border: '1px solid #FFEAEA',
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
                        color='#F11299'
                    >
                        Your event has been created!
                    </Typography>
                    <Typography 
                        color='#F11299'
                        sx={{
                            margin:'0 0 10px',
                        }}
                    >
                        Gift exchanges need at least 3 participants
                    </Typography>
                </Box>
                <Box>
                    <Button 
                    onClick={moveToEventview}
                    variant='contained'
                    sx={{ 
                        border: '2px solid #F11299',
                        borderRadius: '10px',
                        width: '100%',
                        fontSize: '1rem',
                        color: 'white',
                        background: '#F11299',
                        textTransform: 'inherit',
                        fontWeight:'bold',
                        '&:hover': {
                        backgroundColor: 'white',
                        color: '#F11299',
                        border: '1px solid #F11299'
                        },
                        marginTop: '10px',
                        marginBottom: '20px',
                    }}
                    >
                    View Gift exchange
                    </Button>
                </Box>
                <Box>
                    <Button 
                    onClick={moveToInvitepage}
                    variant='contained'
                    sx={{ 
                        border: '1px solid #F11299',
                        borderRadius: '10px',
                        width: '100%',
                        fontSize: '1rem',
                        color: '#F11299',
                        background: '#fff',
                        textTransform: 'inherit',
                        fontWeight:'bold',
                        '&:hover': {
                        backgroundColor: '#F11299',
                        color: 'white',
                        border: '1px solid #F11299'
                        },
                        marginTop: '10px'
                    }}
                    >
                    Copy Invitation
                    </Button>
                </Box>
                <Box sx={{ 
                        // border: '1px solid grey',
                        borderRadius: '10px',
                        width: '100%',
                        fontSize: '1rem',
                        color: '#F11299',
                        textTransform: 'inherit',
                        fontWeight:'bold',
                        marginTop: '10px'
                    }}>
                { show ? 
                    <CopyInvitation 
                        eventName={eventDetails.eventName} 
                        firstName={user.firstName} 
                        rsvpDate={eventDetails.rsvpDate}
                        eventId={eventId}
                    /> 
                    : 
                    null
                }
            </Box>
            </Box>
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '5px solid #F11299',
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