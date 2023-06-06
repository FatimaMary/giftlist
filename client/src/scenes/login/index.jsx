import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
      email: "",
      password: "",
  })

  const handleChange = (e) => {
      setLoginData({
          ...loginData,
          [e.target.name]: e.target.value,
      });
  };

  const handleLogin =async(e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, loginData.email, loginData.password)
          .then(async(res) => {
              console.log(res);
              // navigate(`/groupcreate?userId=${res.user.uid}`)
              navigate(`/giftexchange?userId=${res.user.uid}`)
          })
      console.log("button clicked");
      // alert("Form submitted");
  }

return (
  <Box 
    sx={{
      display: 'flex', 
      flexDirection: 'column' ,
      justifyContent: 'space-around',
      justifyContent: 'center',
      alignItems: 'center'
  }}
    mt='50px'
    color='red'
  >
      <Box>
          <Typography variant='h3'>Login</Typography>
          <Typography type='text'>Login to my WishList.</Typography>
      </Box>
      <Box>
          <Typography type='text'>(If you don't have an account yet, Kindly
              <Link to='/register'>Register Here </Link>)
          </Typography>
      </Box>
      <form onSubmit={handleLogin}>
          <Box
          sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px', 
          }}
          >
              <TextField 
                  id="outlined-basic-email"
                  name='email' 
                  label="Email"
                  type='email'
                  variant="outlined" 
                  sx={{
                      margin: '1rem',
                      width: '400px',
                      borderRadius: '10px',
                  }}
                  value={loginData.email}
                  onChange={handleChange}
              />
              <TextField 
                  id='outlined-basic-password'
                  name='password' 
                  label='Password' 
                  type='password'
                  variant='outlined' 
                  sx={{
                      margin: '1rem',
                      width: '400px',
                      borderRadius: '10px',
                  }}
                  value={loginData.password}
                  onChange={handleChange}
              />
              <Box 
                  sx={{
                      display: 'flex',
                      justifyContent: 'center'
                  }}
                  mb='15px'
              >
                  <Button 
                      sx={{ 
                          border: '2px solid green',
                          borderRadius: '20px',
                          width: '150px',
                          fontSize: '1rem',
                          color: 'green',
                          fontWeight: 'bold'
                      }}
                      type="submit"
                      
                  >
                      Login
                  </Button>
              </Box>
          </Box>
      </form>
      <Box>
          <Typography
              sx={{cursor: 'pointer'}}
          >
              Forgot your password?
          </Typography>
      </Box>
  </Box>
)
}

export default Login