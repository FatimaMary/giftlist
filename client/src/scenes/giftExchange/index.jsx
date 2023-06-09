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
import Santa from './Santa.png';

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
      backgroundColor='#e8ecf1'
      height='100vh'
      width='100vw'
      p='50px 30px 33px 30px'
    >
    <Typography 
      variant='h2'
      sx={{
        fontWeight: 600,
        fontSize: '32px',
        lineHeight: '34px',
        color: '#101a34',
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
        flexWrap: 'wrap',
        background: '#ffffff',
        // marginY: '-12px',
      }}
    >
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
          border: '1px solid lightgrey',
          '&:hover': {
            backgroundColor: 'skyblue',
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
                <CardMedia
                  component="img"
                  height="140"
                  image={Santa}
                  alt="Image Description"
                />
                <Box 
                  padding='10px 15px'
                  sx={{
                    borderTop: '1px solid #e8ecf1',
                    
                  }}
                >
                <Typography sx={{ fontSize: 16 }}  variant='h6' fontWeight='bold' color='red' >
                {cardData.giftExchangeDate}
                </Typography>
                <Typography variant="body2" fontWeight='bold'>
                  {cardData.eventName}
                </Typography>
                </Box>
              </CardContent>
            </Card>
          )) } 
      </Box>
    </Box>
  </Box>
}

export default GiftExchange