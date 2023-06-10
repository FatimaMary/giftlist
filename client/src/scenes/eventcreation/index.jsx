import React, { useState } from 'react'
import { 
  Box,
  TextField,
  Typography,
  Button
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import Star from './star.png'

function EventCreation() {
  const [eventName, setEventName] = useState();
  const [giftExchangeDate, setGiftExchangeDate] = useState();
  const [rsvpDate, setRsvpDate] = useState();
  const [confirmation, setConfirmation] = useState();
  const [searchParam] = useSearchParams();
  const userId = searchParam.get("userId")
  const navigate = useNavigate();

  const moveToNextStep = (e) => {
    e.preventDefault();
    axios.post("http://localhost:2309/event/add", {
      eventName: eventName,
      giftExchangeDate: giftExchangeDate,
      rsvpDate: rsvpDate,
      confirmation: confirmation,
      userId: userId
    })
    .then((response) => {
      console.log("post response: ", response);
      console.log("response data: ", response.data);
      navigate(`/budget?eventId=${response.data.eventId}`);
    })
  }

  const handleClick = () => {
    navigate(`/giftexchange?userId=${userId}`)
  }

  return <Box 
      backgroundColor='#e8ecf1'
      height='100vh'
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
      >Gift exchange</Button>
    </Box>
    <Box 
      sx={{
        minHeight: '80vh',
        background: '#fff',
        border: '1px solid #e8ecf1',
        borderRadius: '10px'
      }}
    >
      <Box>
        <Box>
          <img src={Star} alt='star image' />
          <Typography
        variant='h4'
        fontStyle='italic'
      >
        Let's get started
      </Typography>
        </Box>
        <Box>
        <Box>
        <Typography >Event Name</Typography>
        <TextField 
          placeholder='Enter event name'
          sx={{
            width: '400px'
          }}
          type='text'
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
      </Box>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          gap: '30px'
        }}
      >
        <Box>
          <Typography>Gift exchange date:</Typography>
          <TextField 
            type='date'
            sx={{ width: '180px'}}
            value={giftExchangeDate}
            onChange={(e) => setGiftExchangeDate(e.target.value)}
          />
        </Box>
        <Box>
          <Typography>RSVP Date:</Typography>
          <TextField 
            type='date' 
            sx={{ width: '180px'}} 
            value={rsvpDate}
            onChange={(e) => setRsvpDate(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={{
        width: '400px'
      }}>
        <FormControl>
          <FormLabel 
            id="demo-row-radio-buttons-group-label"
            sx={{
              fontWeight: 'bold'
            }}
          >Are you participating?</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          >
            <FormControlLabel 
              value="true" 
              control={<Radio />} 
              label="Yes" 
              sx={{
                width: '150px'
              }}
            />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <Button 
          variant='contained'
          onClick={moveToNextStep}
        >
          Next step
        </Button>
      </Box>
        </Box>
      </Box>
    </Box>
  </Box>
}

export default EventCreation