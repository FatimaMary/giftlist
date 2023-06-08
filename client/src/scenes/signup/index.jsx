import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupValidation from '../../Components/SignupValidation';
import { Box, Typography, TextField, FormControl as Form, Button, createTheme, ThemeProvider } from '@mui/material';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import axios from 'axios';
import Navbar from '../../Components/Navbar';

function Signup() {
    const [signupData, setSignupData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([]);
   
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

    const updateHandleChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit =async(e) => {
        setLoading(true);
        e.preventDefault();
        // setErrors(RegisterValidation(registerData));
        setDataIsCorrect(true);
        console.log("button clicked")
         createUserWithEmailAndPassword(auth, signupData.email, signupData.password)
            .then(async (res) => {
                const user = res.user;
                await updateProfile(user, {
                    displayName: signupData.name
                });
                // create profile here
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    email: signupData.email,
                    password: signupData.password,
                });
                console.log("Register with firebase");

                //Make the POST request to your API end point
                fetch("http://localhost:2309/user/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: user.uid,
                        email: signupData.email,
                        password: signupData.password,
                    }),
                    
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log("data: " , data);
                    console.log("fetch id: ", data.userId);
                    navigate(`/signup1?userId=${user.uid}`);
                })
                .catch((error) => {
                    console.log(error);
                    setErrors(error.message);
                });
            })
    }

    const handleClick = () => {
        console.log("Login Button Clicked")
        navigate("/login");
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
                    Sign up for GiftList
                </Typography>
                <Typography
                    variant='body1'
                    sx={{
                        opacity: '0.5',
                        fontSize: '1rem',
                    }}
                >
                    It's quick and easy.
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
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
                            value={signupData.email}
                            onChange={updateHandleChange}
                         />
                         </ThemeProvider>
                    </Box>
                    {errors.email && <p className="error">{errors.email}</p>}
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
                                placeholder='Create Password'
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
                                value={signupData.password}
                                onChange={updateHandleChange}
                            />
                        </ThemeProvider>
                    </Box>
                    {errors.password && <p className="error">{errors.password}</p>}
                    <Box 
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                        mb='15px'
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
                        {err && <span>Something went wrong</span>}
                    </Box>
                </Box>
            </form>
            {/* <Typography>You do have an account? <Button onClick={handleClick}>Login</Button></Typography> */}
        </Box>
        </Box>
    </Box>
  )
}

export default Signup