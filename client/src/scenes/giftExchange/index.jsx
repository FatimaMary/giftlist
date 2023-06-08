import React, { useEffect, useState } from 'react';
import { 
    Box,
    TextField,
    Typography,
    Button,
    CardContent, 
    Card,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
        navigate(`/eventcreate?userId=${userId}}`)
      }
    
  return <Box 
      m='1.5rem 2.5rem'
    >
    <Typography 
      variant='h4'
    >
      Gift exchange
    </Typography>
    <Box  sx={{
        display: 'flex'
      }}
    >
      <Box>
        <Typography>Upcoming({eventData.length})</Typography>
      </Box>
      <Box 
        sx={{ 
          width: 250, 
          height: '250px', 
          m: '1.5rem', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap:'30px',
          border: '2px solid black',
          '&:hover': {
            backgroundColor: 'skyblue',
            color: 'white'
          },
        }}
        onClick={handleClick}
        >
          <AddCircleOutlineIcon 
            sx={{
              fontSize: '3rem',
              // color: 'skyblue',
              // '&:hover': {
              //   backgroundColor: 'skyblue',
              //   color: 'white'
              // },
            }}
          />
          <Typography>Create a new event</Typography>
      </Box>
      <Box>
      {eventData.map((cardData, i) => (
              <Card sx={{ width: 250, height: '250px', m: '1.5rem' }} key={i}>
              <CardContent>
                <img src='../../assets/santa.png' />
                <Typography sx={{ fontSize: 16 }}  variant='h6' fontWeight='bold' color='red' >
                {cardData.giftExchangeDate}
                </Typography>
                <Typography variant="body2" fontWeight='bold'>
                  {cardData.eventName}
                </Typography>
              </CardContent>
            </Card>
          )) } 
      </Box>
    </Box>
  </Box>
}

export default GiftExchange