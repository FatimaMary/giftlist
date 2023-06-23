import React, { useEffect, useState } from 'react';
import { 
    Box,
    TextField,
    Typography,
    Button,
    CardContent, 
    Card,
    CardMedia,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Santa from './santa1.png';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CopyrightIcon from '@mui/icons-material/Copyright';
import Footer from '../../Components/Footer';


function GiftExchange() {
    const [eventData, setEventData] = useState([]);
    const [searchParam] = useSearchParams();
    const userId = searchParam.get("userId");
    const navigate = useNavigate();

    useEffect(() => {
     axios.get(`http://localhost:2309/event/${userId}`)
     .then((response) => {
        console.log("dashboard response: " , response);
        setEventData(response.data);
    })
    .catch((err) => console.log("Error: ", err))
    }, [])

    const handleClick = () => {
        navigate(`/eventcreate?userId=${userId}`)
      }
    
  return <Box 
      backgroundColor='#FFEAEA'
      width='100vw'
      p='50px 30px 33px 30px'
      height='100%'
    >
    <Typography 
      variant='h2'
      sx={{
        fontWeight: 600,
        fontSize: '32px',
        lineHeight: '34px',
        color: '#C21010',
        marginBottom: '16px',
        wordBreak: 'break-word',
      }}
    >
      Gift exchange
    </Typography>
    <Box 
      sx={{
        display: 'flex',
        background: '#fafbfd',
        padding: '5px 20px 20px',
        borderBottom: '1px solid #cad3dd',
        marginBottom: 0,
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        gap: '10px',
      }}
    >
        <Typography>Upcoming({eventData.length})</Typography>
        <Typography>Past()</Typography>
      </Box>
    <Box  sx={{
        display: 'flex',
        // flexWrap: 'wrap',
        background: '#ffffff',
        // marginY: '-12px',
      }}
    >
     
      <Box 
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          marginLeft: '30px'
        }}
      >
         <Box 
        sx={{ 
          width: 220, 
          height: '250px', 
          m: '1.5rem', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap:'30px',
          border: '1px solid lightgrey',
          '&:hover': {
            backgroundColor: '#E64848',
            color: 'white'
          },
          borderRadius: '10px',
          padding: '0 12px',
          boxSizing: 'border-box',
        }}
        onClick={handleClick}
        >
          <AddCircleOutlineIcon 
            sx={{
              fontSize: '3rem',
            }}
          />
          <Typography>Create a new event</Typography>
      </Box>
      {eventData.map((cardData, i) => (
              <Card 
                sx={{ 
                  width: 220, 
                  height: '250px', 
                  m: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }} 
                key={i}
                onClick={() => navigate(`/eventview?eventId=${cardData.eventId}`)}
              >
              <CardContent>
                <Box sx={{
                  height: '70%'
                }}>
                  <CardMedia
                    component="img"
                    // height="140"
                    image={Santa}
                    alt="Image Description"
                    sx={{
                      height: '100%',
                      width: '80%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  />
                </Box>
                <Box 
                  // padding='10px 15px'
                  sx={{
                    borderTop: '1px solid #FFEAEA',
                    height: '30%',
                    width: '220px',
                    background: '#FFEAEA',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px 30px',
                    '&:hover': {
                        backgroundColor: '#C21010',
                        color: 'white'
                      },
                  }}
                >
                <Typography 
                  sx={{ 
                    fontSize: 16,
                    opacity: 0.7,
                    '&:hover' : {
                      opacity: 1,
                    }
                  }}  
                  variant='h6' 
                  fontWeight='bold'
                >
                  <CalendarMonthIcon sx={{
                    fontSize: '20px'
                  }}/>
                {cardData.giftExchangeDate}
                </Typography>
                <Typography 
                  variant="body2" 
                  fontWeight='bold'
                >
                  {cardData.eventName}
                </Typography>
                </Box>
              </CardContent>
            </Card>
          )) } 
      </Box>
    </Box>
    {/* <Box sx={{
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
            fontSize: '13px'
          }} 
        >
          GiftList. All Rights Reserved
        </Typography>
      </Box>
      <Box>
        <Button 
          sx={{
            textTransform: 'inherit',
            color:'black',
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
            color:'black',
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
            color:'black',
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
            color:'black',
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
    </Box> */}
    <Footer/>
  </Box>
}

export default GiftExchange