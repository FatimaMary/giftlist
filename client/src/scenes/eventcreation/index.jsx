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
      navigate(`/budget?eventId =${response.data.eventId} `)
    })
  }

  return <Box 
      m='1.5rem 2.5rem'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '600px',
        border: '2px solid grey',
        justifyContent: 'center',
        alignItems: 'center'
      }} 
  >
    <Typography
      variant='h4'
      fontStyle='italic'
    >
      Let's get started
    </Typography>
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
}

export default EventCreation