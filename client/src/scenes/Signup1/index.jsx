import React, { useState } from 'react';
import { Box, Typography, TextField, FormControl as Form, Button, } from '@mui/material';
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';

function Signup1() {
  const [firstName, setFirstName] = useState();
  const [secondName, setSecondName] = useState();
  const [birthDay, setBirthDay] = useState();
  const [searchParam] = useSearchParams();
  const userId = searchParam.get("userId");
  const navigate = useNavigate();


  const handleClick = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:2309/user/${userId}`, {
      firstName: firstName,
      secondName: secondName,
      birthDay: birthDay,
    })
    .then((response) => {
      console.log("update response: " , response);
      console.log("update response data: ", response.data);
      navigate(`/eventcreate?userId=${userId}`)
    })
  }

  return (
    <Box 
      m='1.5rem 2.5rem'
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        // alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        border: '2px solid grey',
        width: '800px',
        boxShadow: '5px 5px grey'
      }}
    >
      <Box 
        sx={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
      >
        <Box>
          <Typography>First Name</Typography>
          <TextField 
            placeholder='Enter First Name'
            sx={{
              width: '350px'
            }}
            value={firstName}
            type='text'
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>
        <Box>
          <Typography>Second Name</Typography>
          <TextField 
            placeholder='Enter Second Name'
            sx={{
              width: '350px'
            }}
            type='text'
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
          />
        </Box>
      </Box>
      <Box m='1.5rem'>
        <Typography>BirthDay</Typography>
        <TextField 
          type='date'
          sx={{
            width: '250px'
          }} 
          value={birthDay}
          onChange={(e) => setBirthDay(e.target.value)}
        />
      </Box>
      <Box m='1.5rem'>
        <Button 
          variant='contained'
          onClick={handleClick}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default Signup1