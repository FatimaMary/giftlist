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
      signInWithEmailAndPassword(auth, loginData.email, loginData.password)
          .then(async(res) => {
              console.log(res);
              // navigate(`/groupcreate?userId=${res.user.uid}`)
              navigate(`/giftexchange?userId=${res.user.uid}`)
          })
      console.log("button clicked");
  }

  const handleSignup = () => {
    navigate("/signup");
  }

return (
<Box >
        <Navbar />
        <Box 
            sx={{
                backgroundColor: '#99DBF5',
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
            border: '1px solid grey',
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
                         />
                         </ThemeProvider>
                    </Box>
                    <Box>
                    <Typography
                            ml='1rem'
                            mt= '1.5rem'
                            mb='0'
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
                                border: '2px solid skyblue',
                                borderRadius: '20px',
                                width: '450px',
                                fontSize: '1rem',
                                color: 'white',
                                background: 'skyblue',
                                textTransform: 'inherit',
                                fontWeight:'bold',
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
                        color: 'red'
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
                            '&:hover': {
                                backgroundColor: '#D8D8D8',
                                color: 'black',
                                border: '1px solid skyblue'
                              },
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