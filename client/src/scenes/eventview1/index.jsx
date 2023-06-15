import React, { useEffect, useState } from 'react';
import { 
    Box,
    Typography,
    Button,
} from '@mui/material';
import Santa from '../giftExchange/santa1.png';
import Avatar from '@mui/material/Avatar';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../../Components/Footer';

function EventView1() {
    const [eventDetails, setEventDetails] = useState([]);
    const [name, setName] = useState([]);
    const [show, setShow] = useState(false);
    const [searchParam] = useSearchParams();
    const eventId = searchParam.get("eventId");
    const navigate = useNavigate();

    useEffect(() => {
      axios.get(`http://localhost:2309/event/get/${eventId}`)
        .then((response) => {
            console.log("Get response: ", response);
            console.log("Get response data: ", response.data);
            setEventDetails(response.data);
        });
        axios.get(`http://localhost:2309/event/user/${eventId}`)
            .then((response) => {
                console.log("User Name get response: ", response);
                console.log("user name get response data: ", response.data);
                setName(response.data);
            });
    }, [])
    
    function stringAvatar(name) {
        return {
          children: `${name.split(' ')[0][0]}`,
        };
      }

    const handleClick = () => {
        setShow(true);
    }

    const handleLogin = () => {
        navigate('/login')
    }

    const handleSignup = () => {
        navigate('/signup')
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
                    height={200} 
                    width={250}
                    className='starimage'
                />
            </Box>
            <Box sx={{
                width: '100%',
                margin: '15px',
            }}>
                <Box 
                  sx = {{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '15px'
                  }}
                >
                    <Typography
                        variant='h2'
                        sx={{
                            fontSize: '28px',
                            lineHeight: '34px',
                            marginBottom: 0,
                            maxWidth: '73%',
                            fontWeight: 600,
                            color: '#101a34',
                        }}
                    >
                        {eventDetails.eventName}
                    </Typography>
                    <Box 
                       sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-end'
                       }}
                    >
                        <Button
                            sx={{
                                marginRight: '12px',
                                padding: '8px 15px',
                                fontWeight: 600,
                                fontSize: '13px',
                                lineHeight: '18px',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                background: '#50bcd9',
                                color: '#fff',
                                border: '1px solid #50bcd9',
                                textTransform: 'inherit'
                            }}
                        >
                            <ShareOutlinedIcon 
                                sx={{
                                    width: '16px', 
                                    height: '16px',
                                    marginRight: '5px'
                                }}
                            />
                            Invite
                        </Button>
                        <Button
                             sx={{
                                marginRight: '12px',
                                padding: '8px 15px',
                                fontWeight: 600,
                                fontSize: '13px',
                                lineHeight: '18px',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                background: '#fafbfd',
                                color: '#101a34',
                                border: '1px solid #cad3dd',
                                textTransform: 'inherit'
                            }}
                        >
                            <EditCalendarOutlinedIcon 
                                 sx={{
                                    width: '16px', 
                                    height: '16px', 
                                    marginRight: '5px'
                                }}
                            />
                            Edit
                        </Button>
                    </Box>
                </Box>
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'felx-start',
                        alignItems: 'center',
                        marginBottom: '22px',
                        // gap: '25px',

                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '13px',
                            lineHeight: '16px',
                            color: '#5e6577',
                            paddingRight: '15px',
                            marginRight: '15px',
                            borderRight: '1px solid #cad3dd',
                        }}
                    >
                        Exchange gifts by: <span style={{fontWeight: 600, color: '#101a34'}}>{eventDetails.giftExchangeDate}</span>
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '13px',
                            lineHeight: '16px',
                            color: '#5e6577',
                            paddingRight: '15px',
                            marginRight: '15px',
                            borderRight: '1px solid #cad3dd',
                        }}
                    >
                        RSVP by: <span style={{fontWeight: 600, color: '#101a34'}}>{eventDetails.rsvpDate}</span>
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '13px',
                            lineHeight: '16px',
                            color: '#5e6577',
                            paddingRight: '15px',
                            marginRight: '15px',
                            // borderRight: '1px solid #cad3dd',
                        }}
                    >
                        Gift budget: <span style={{fontWeight: 600, color: '#101a34'}}>{eventDetails.budget}</span> 
                    </Typography>
                </Box>
                <Box 
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginBottom: '10px',
                    width: '100%',
                  }}
                >
                    <Avatar 
                        {...stringAvatar(`${name.firstName}`)} 
                        sx={{
                            width: '40px',
                            height: '40px',
                            background: '#50bcd9',
                            fontSize: '13px',
                        }}
                    />
                    <Box 
                      sx={{
                        flexBasis: 'calc(100% - 48px)',
                        maxWidth: 'calc(100% - 48px)',
                        paddingLeft: '12px'
                      }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontSize: '13px',
                                lineHeight: '16px',
                                color: '#818694',
                                marginBottom: 0,
                            }}
                        >
                            Organizer
                        </Typography>
                        <Typography
                            variant='h4'
                            sx={{
                                fontWeight: 600,
                                fontSize: '17px',
                                lineHeight: '22px',
                                color: '#101a34',
                                marginBottom: 0,
                            }}
                        >
                            {name.firstName} {name.secondName}
                        </Typography>
                    </Box>
                </Box>
                <Box 
                  sx={{
                    fontSize: '15px',
                    lineHeight: '140%',
                    color: '#5e6577',
                    paddingBottom: '17px',
                    borderBottom: '1px solid #cad3dd',
                  }}
                >
                    <Typography
                        sx={{
                            height:'20px',
                            overflow: 'hidden',
                            maxWidth: '500px',
                            wordBreak: 'break-word',
                            margin: '0px'
                        }}
                    >{eventDetails.details}</Typography>
                </Box>
            </Box>
        </Box>
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
            <Typography
                sx={{
                    color: '#101a34',
                    fontWeight: 600,
                    fontSize: '17px',
                    lineHeight: '22px',
                    textAlign: 'center',
                    marginRight: '20px',
                    padding: '0 0 6px',
                    '&:hover': {
                        cursor: 'pointer'
                    },
                    borderBottom: '3px solid #50bcd9'
                }}
            >
                Home
            </Typography>
            <Typography
                sx={{
                    color: '#101a34',
                    fontWeight: 600,
                    fontSize: '17px',
                    lineHeight: '22px',
                    textAlign: 'center',
                    marginRight: '20px',
                    padding: '0 0 6px',
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}
            >
                Participants
            </Typography>
        </Box>
        {show ?  
            <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }}>
            <Box
            sx={{ 
                border: '1px solid grey',
                borderRadius: '10px',
                width: '280px',
                padding: '10px',
                fontSize: '1rem',
                color: '#0f7b9b',
                background: '#e8ecf1',
                textTransform: 'inherit',
                fontWeight:'bold',
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
            >
                <Typography
                    sx={{
                        color: '#101a34',
                        fontWeight: 600,
                        fontSize: '17px',
                        lineHeight: '22px',
                        textAlign: 'center',
                        marginRight: '20px',
                        padding: '0 0 6px',
                    }}
                >Awesome! Login or Sign up to confirm your RSVP</Typography>
                <Box
                sx={{
                    display: 'flex',
                    gap: '10px'
                }}
                >
                    <Button
                        variant='contained'
                        onClick={handleLogin}
                        sx={{ 
                            border: '2px solid skyblue',
                            borderRadius: '10px',
                            width: '48%',
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
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        variant='contained'
                        onClick={handleSignup}
                        sx={{ 
                            border: '2px solid skyblue',
                            borderRadius: '10px',
                            width: '48%',
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
                        }}
                    >
                        Sign up
                    </Button>
                </Box>
            </Box>
            </Box> :
            <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }}>
            <Box
            sx={{ 
                border: '1px solid grey',
                borderRadius: '10px',
                width: '350px',
                padding: '10px',
                fontSize: '1rem',
                color: '#0f7b9b',
                background: '#fff',
                textTransform: 'inherit',
                fontWeight:'bold',
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '24px 16px 16px 16px',
            }}
            >
                <Typography
                    sx={{
                        color: '#101a34',
                        fontWeight: 600,
                        fontSize: '17px',
                        lineHeight: '22px',
                        textAlign: 'center',
                        marginRight: '20px',
                        padding: '0 0 6px',
                    }}
                >
                    You're invited!
                </Typography>
                <Typography
                    sx={{
                        color: '#101a34',
                        // fontWeight: 600,
                        fontSize: '17px',
                        lineHeight: '22px',
                        textAlign: 'center',
                        marginRight: '20px',
                        padding: '0 0 6px',
                    }}
                >Would you like to particpate?</Typography>
                <Box
                sx={{
                    display: 'flex',
                    gap: '10px'
                }}
                >
                    <Button
                        variant='contained'
                        // onClick={handleClick}
                        sx={{ 
                            border: '2px solid #cad3dd',
                            borderRadius: '7px',
                            fontWeight: 600,
                            width: '48%',
                            fontSize: '1rem',
                            color: '#0f7b9b',
                            background: '#fafbfd',
                            textTransform: 'inherit',
                            '&:hover': {
                            backgroundColor: '#0f7b9b',
                            color: '#fafbfd',
                            border: '1px solid #0f7b9b',
                            cursor: 'pointer',
                            },
                            marginTop: '10px',
                            lineHeight: '22px',
                            // padding: '12px 30px',
                        }}
                    >No</Button>
                    <Button
                        variant='contained'
                        onClick={handleClick}
                        sx={{ 
                            border: '2px solid skyblue',
                            borderRadius: '7px',
                            width: '48%',
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
                            // marginBottom: '20px',
                        }}
                    >Yes</Button>
                </Box>
            </Box>
            </Box>
        }
        <Footer />
    </Box>
}

export default EventView1