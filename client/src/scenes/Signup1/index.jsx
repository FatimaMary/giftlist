import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  FormControl as Form, 
  Button, 
  createTheme, 
  ThemeProvider 
} from '@mui/material';
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import Navbar from '../../Components/Navbar';

function Signup1() {
  const [firstName, setFirstName] = useState();
  const [secondName, setSecondName] = useState();
  const [birthDay, setBirthDay] = useState();
  const [searchParam] = useSearchParams();
  const userId = searchParam.get("userId");
  const navigate = useNavigate();

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'grey', 
              },
            },
            '& .MuiOutlinedInput-root.Mui-focused': {
              '& fieldset': {
                borderColor: 'grey', 
              },
            },
          },
        },
      },
    },
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:2309/user/${userId}`, {
      firstName: firstName,
      secondName: secondName,
      birthDay: birthDay,
    })
    .then((response) => {
      console.log("update response: " , response);
      console.log("update response data: ", response.data);
      navigate(`/giftexchange?userId=${userId}`)
    })
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          backgroundColor: '#CFE8A9',
          height: '85vh',
          // width: '100vw',
          display: 'flex', 
          flexDirection: 'column' ,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box 
          m='1.5rem 2.5rem'
          color='#C21010'
          sx={{
            display: 'flex', 
            flexDirection: 'column' ,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            // height: '400px',
            border: '1px solid grey',
            width: '350px',
            borderRadius: '10px',
        }}
        >
          {/* <Box 
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
              }}
          > */}
            <Box m='1.5rem' >
              <Typography>First Name</Typography>
              <ThemeProvider theme={theme}>
                <TextField 
                  placeholder='Enter First Name'
                  sx={{
                    width: '250px',
                    '& .MuiOutlinedInput-root': {
                      height: '40px',
                  },
                  }}
                  value={firstName}
                  type='text'
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </ThemeProvider>
            </Box>
            <Box m='1.5rem'>
              <Typography>Last Name</Typography>
              <ThemeProvider theme={theme}>
                <TextField 
                  placeholder='Enter Second Name'
                  sx={{
                    width: '250px',
                    '& .MuiOutlinedInput-root': {
                      height: '40px',
                  },
                  }}
                  type='text'
                  value={secondName}
                  onChange={(e) => setSecondName(e.target.value)}
                />
              </ThemeProvider>
            </Box>
          {/* </Box> */}
          <Box m='1.5rem'>
            <Typography>BirthDay</Typography>
            <ThemeProvider theme={theme}>
              <TextField 
                type='date'
                sx={{
                  width: '250px',
                  '& .MuiOutlinedInput-root': {
                    height: '40px',
                },
                }} 
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
              />
            </ThemeProvider>
          </Box>
          <Box m='1.5rem'>
            <Button 
              variant='contained'
              onClick={handleSubmit}
              sx={{ 
                border: '2px solid #C21010',
                borderRadius: '20px',
                width: '250px',
                fontSize: '1rem',
                color: 'white',
                background: '#C21010',
                textTransform: 'inherit',
                fontWeight:'bold',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#C21010',
                  border: '1px solid #C21010'
                },
            }}
            >
              Submit
            </Button>
          </Box>
          <Box>
          <Typography>
            Already have an account? 
            <Button 
              onClick={handleClick}
              sx={{
                textTransform: 'inherit',
                '&:hover': {
                  backgroundColor: '#D8D8D8',
                  color:'#C21010',
                  border: '1px solid #C21010'
                },
              }}
            >
              Login
            </Button>
          </Typography>
        </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Signup1