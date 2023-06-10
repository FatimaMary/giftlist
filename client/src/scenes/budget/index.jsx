import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography,
  createTheme,
} from '@mui/material';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

function Budget() {
  const [budget, setBudget] = useState();
  const [details, setdetails] = useState();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("eventId");
  const userId = searchParam.get("userId");
  const navigate = useNavigate();

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#cad3dd', 
              },
            },
            '& .MuiOutlinedInput-root.Mui-focused': {
              '& fieldset': {
                borderColor: '#cad3dd', 
              },
            },
          },
        },
      },
    },
  });

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

  const handleClick = () => {
    navigate(`/eventcreate?userId=${userId}`);
  }

  return <Box 
      backgroundColor='#e8ecf1'
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
      >Step1</Button>
    </Box>
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