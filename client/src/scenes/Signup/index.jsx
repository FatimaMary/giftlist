import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupValidation from '../../Components/SignupValidation';
import { Box, Typography, TextField, FormControl as Form, Button, } from '@mui/material';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import axios from 'axios';

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
                fetch("http://localhost:2318/giftuser/add", {
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
                    // navigate(`/eventcreate?userId=${user.uid}`);
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
    <Box display="flex" width="100%" height="100%" m='1.5rem 2.5rem'>
        <Box 
        sx={{
            display: 'flex', 
            flexDirection: 'column' ,
            // justifyContent: 'space-around',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        // mt='50px'
        color='blue'
        // width='50%'
        // height="100%"
        m='1.5rem 2.5rem'
        >
            <Box>
                <Typography
                    variant='h3'
                >
                    Sign up for Giftlist
                </Typography>
                <Typography
                    variant='h6'
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
                    {/* <TextField 
                        // id="outlined-basic" 
                        label="Name" 
                        variant="outlined" 
                        sx={{
                            margin: '1rem',
                            width: '400px',
                            borderRadius: '10px',
                        }}
                        type='text'
                        name='name'
                        value={signupData.name}
                        onChange={updateHandleChange}
                    /> */}
                    {/* <TextField 
                        // id="outlined-basic" 
                        label="Mobile Number" 
                        variant="outlined" 
                        sx={{
                            margin: '1rem',
                            width: '400px',
                            borderRadius: '10px',
                        }}
                        type='text'
                        name='mobileNumber'
                        value={signupData.mobileNumber}
                        onChange={updateHandleChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>} */}
                    <TextField 
                        // id="outlined-basic" 
                        label="Email" 
                        variant="outlined" 
                        sx={{
                            margin: '1rem',
                            width: '400px',
                            borderRadius: '10px',
                        }}
                        type='email'
                        name='email'
                        value={signupData.email}
                        onChange={updateHandleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <TextField 
                        // id='outlined-basic' 
                        label='Create Password' 
                        variant='outlined' 
                        sx={{
                            margin: '1rem',
                            width: '400px',
                            borderRadius: '10px',
                        }}
                        type='password'
                        name='password'
                        value={signupData.password}
                        onChange={updateHandleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <Box 
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                        mb='15px'
                    >
                        <Button 
                            sx={{ 
                                border: '2px solid skyblue',
                                borderRadius: '20px',
                                width: '200px',
                                fontSize: '1rem',
                                color: 'green',
                            }}
                        type="submit"
                        >
                            Register
                        </Button>
                        {err && <span>Something went wrong</span>}
                    </Box>
                </Box>
            </form>
            <Typography>You do have an account? <Button onClick={handleClick}>Login</Button></Typography>
        </Box>
    </Box>
  )
}

export default Signup