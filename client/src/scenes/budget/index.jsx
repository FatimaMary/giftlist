import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

function Budget() {
  const [budget, setBudget] = useState();
  const [details, setdetails] = useState();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("eventId");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:2309/event/${eventId}`, {
      budget: budget,
      details: details,
    })
    .then((response) => {
      console.log("update response: ", response);
      console.log("update data: ", response.data);
    })
  }

  return <Box m='1.5rem 2.5rem'
      p='1.5rem 2.5rem'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        width: '500px',
        border: '2px solid grey', 
      }}
    >
    <Typography variant='h4'>Gift exchange rules</Typography>
    <Box sx={{
      width: '400px'
    }}>
      <Typography 
        variant='body1'
        fontWeight='bold'
      >
        Spending limit per gift
      </Typography>
      <TextField 
        placeholder='Enter Min Budget'
        sx={{
          width: '400px'
        }}
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      /> 
    </Box>
    <Box sx={{
      width: '400px'
    }}>
      <Typography
        variant='body1'
        fontWeight='bold'
      >
        Other details(Optional)
      </Typography>
      <TextField 
          placeholder='Enter your text'
          sx={{
            width: '400px',
            // height: '200px'
          }}
          value={details}
          onChange={(e) => setdetails(e.target.value)}
      />
    </Box>
    <Box >
      <Button 
        variant='contained'
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  </Box>
}

export default Budget