import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    TextField, 
    Button,
    createTheme, 
    ThemeProvider  
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import Navbar from '../../Components/Navbar';

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
      email: "",
      password: "",
  })
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
      setLoginData({
          ...loginData,
          [e.target.name]: e.target.value,
      });
  };

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
  
  const handleLogin =async(e) => {
      e.preventDefault();
      const validationErrors = {};
        if (!loginData.email) {
        validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
        validationErrors.email = 'Email is invalid';
        }

        if (!loginData.password) {
        validationErrors.password = 'Password is required';
        } else if (loginData.password.length < 5) {
        validationErrors.password = 'Password must be more than 5 characters';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
      signInWithEmailAndPassword(auth, loginData.email, loginData.password)
          .then(async(res) => {
              console.log(res);
              // navigate(`/groupcreate?userId=${res.user.uid}`)
              navigate(`/giftexchange?userId=${res.user.uid}`)
              setIsLoggedIn(true);
          })
      console.log("button clicked");
        }
  }

  const handleSignup = () => {
    navigate("/signup");
  }

return (
<Box >
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
        sx={{
            display: 'flex', 
            flexDirection: 'column' ,
            justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: 'white',
            // height: '600px',
            border: '1px solid #CFE8A9',
            width: '500px',
            borderRadius: '10px',
        }}
        color='black'
        m='1.5rem 2.5rem'
        >
            <Box mt={1.5} ml={2.5}>
                <Typography
                    variant='h5'
                    fontWeight='bold'
                    mb='15px'
                    sx={{
                        color: '#C21010',
                    }}
                >
                    Login to GiftList
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
                    <Box>
                        <Typography
                            ml='1rem'
                            mt= '1.5rem'
                            mb='0'
                            sx={{
                                color: '#C21010',
                            }}
                        >
                            Email
                        </Typography>
                        <ThemeProvider theme={theme}>
                        <TextField 
                            placeholder='Enter your Email'
                            variant="outlined"
                            sx={{
                                ml:'1rem',
                                width: '450px',
                                borderRadius: '10px',
                                '& .MuiOutlinedInput-root': {
                                    height: '40px',
                                },
                            }}
                            type='email'
                            name='email'
                            value={loginData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                         />
                         </ThemeProvider>
                    </Box>
                    <Box>
                    <Typography
                            ml='1rem'
                            mt= '1.5rem'
                            mb='0'
                            sx={{
                                color: '#C21010',
                            }}
                        >
                            Password
                        </Typography>
                        <ThemeProvider theme={theme}>
                            <TextField
                                placeholder='Enter your Password'
                                variant='outlined' 
                                sx={{
                                    ml:'1rem',
                                    width: '450px',
                                    borderRadius: '10px',
                                    '& .MuiOutlinedInput-root': {
                                        height: '40px',
                                    },
                                }}
                                type='password'
                                name='password'
                                value={loginData.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                        </ThemeProvider>
                    </Box>
                    <Box 
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                        mb='15px'
                        mt='1rem'
                    >
                        <Button 
                            variant='contained'
                            sx={{ 
                                border: '2px solid #C21010',
                                borderRadius: '20px',
                                width: '450px',
                                fontSize: '1rem',
                                color: 'white',
                                background: '#C21010',
                                textTransform: 'inherit',
                                fontWeight:'bold',
                                '&:hover': {
                                    backgroundColor: '#FFF',
                                    color: '#C21010',
                                    border: '1px solid #C21010'
                                  },
                            }}
                        type="submit"
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </form>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button
                    sx={{
                        textTransform: 'inherit',
                        fontSize: '1rem',
                        color: 'red',
                    }}
                >
                    Forgot Password?
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Typography>
                    Need to create an account? 
                    <Button
                        sx={{
                            textTransform: 'inherit',
                            fontSize: '1rem',
                        }}
                        onClick={handleSignup}
                    >Sign up</Button>
                </Typography>
            </Box>
        </Box>
        </Box>
    </Box>
)
}

export default Login