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
import AddIcon from '@mui/icons-material/Add';

function GiftExchange() {
    const [eventData, setEventData] = useState();
    const [searchParam] = useSearchParams();
    const userId = searchParam.get("userId");
    const navigate = useNavigate();

    useEffect(() => {
     axios.get(`http://localhost:2309/event/${userId}`)
     .then((response) => {
        console.log("dashboard response: " , response);
        setEventData(response.data);
    })
    }, [])

    const handleClick = () => {
        navigate(`/eventcreate?userId=${userId}}`)
      }
    
  return <Box>
    <Typography>Gift exchange</Typography>
    <Box>
    {eventData.map((cardData, i) => (
            <Card sx={{ width: 350, m: '1.5rem' }} key={i}>
            <CardContent>
              <Typography sx={{ fontSize: 16 }}  variant='h6' fontWeight='bold' color='red' >
               {cardData.giftExchangeDate}
              </Typography>
              <Typography variant="body2" fontWeight='bold'>
                {cardData.eventName}
              </Typography>
            </CardContent>
          </Card>
        )) }
        <Box>
            <AddIcon/>
          <Button onClick={handleClick}>Create New Group</Button>
        </Box>
    </Box>
  </Box>
}

export default GiftExchange