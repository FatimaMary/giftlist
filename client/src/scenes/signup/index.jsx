import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  FormControl as Form,
  Button,
  createTheme,
  ThemeProvider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../../Components/Navbar";

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
  const themes = useTheme();
  const isSmallScreen = useMediaQuery(themes.breakpoints.down("sm"));

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "grey",
              },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& fieldset": {
                borderColor: "grey",
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
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setDataIsCorrect(true);
    console.log("button clicked");
    const validationErrors = {};
    if (!signupData.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!signupData.password) {
      validationErrors.password = "Password is required";
    } else if (signupData.password.length < 5) {
      validationErrors.password = "Password must be more than 5 characters";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      ).then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: signupData.name,
        });
        // create profile here
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          email: signupData.email,
          password: signupData.password,
        });
        console.log("Register with firebase");

        //Make the POST request to your API end point
        fetch(`${process.env.REACT_APP_BASE_URL}/user/add`, {
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
            console.log("data: ", data);
            console.log("fetch id: ", data.userId);
            navigate(`/signup1?userId=${user.uid}`);
          })
          .catch((error) => {
            console.log(error);
            setErrors(error.message);
          });
      });
    }
  };

  const handleClick = () => {
    console.log("Login Button Clicked");
    navigate("/login");
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#FFEAEA",
          height: "85vh",
          width: isSmallScreen ? "100%" : "100vw",
          padding: isSmallScreen ? "20px" : "1.5rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "white",
            border: "1px solid #C21010",
            borderRadius: "10px",
            width: isSmallScreen ? "100%" : "500px",
          }}
          color="#C21010"
          m="1.5rem 2.5rem"
        >
          <Box mt={1.5} ml={2.5}>
            <Typography variant="h5" fontWeight="bold" mb="15px">
              Sign up for Santa Surprise
            </Typography>
            <Typography
              variant="body1"
              sx={{
                opacity: "0.5",
                fontSize: "1rem",
              }}
            >
              It's quick and easy.
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Box>
                <Typography ml="1rem" mt="1.5rem" mb="0">
                  Email
                </Typography>
                <ThemeProvider theme={theme}>
                  <TextField
                    placeholder="Enter your Email"
                    variant="outlined"
                    sx={{
                      ml: "1rem",
                      width: isSmallScreen ? "80%" : "450px",
                      borderRadius: "10px",
                      "& .MuiOutlinedInput-root": {
                        height: "40px",
                      },
                    }}
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={updateHandleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </ThemeProvider>
              </Box>

              <Box>
                <Typography ml="1rem" mt="1.5rem" mb="0">
                  Password
                </Typography>
                <ThemeProvider theme={theme}>
                  <TextField
                    placeholder="Create Password"
                    variant="outlined"
                    sx={{
                      ml: "1rem",
                      width: "450px",
                      borderRadius: "10px",
                      "& .MuiOutlinedInput-root": {
                        height: "40px",
                      },
                      width: isSmallScreen ? "80%" : "450px",
                    }}
                    type="password"
                    name="password"
                    value={signupData.password}
                    onChange={updateHandleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </ThemeProvider>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                mb="15px"
              >
                <Button
                  variant="contained"
                  sx={{
                    border: "2px solid #C21010",
                    borderRadius: "20px",
                    width: isSmallScreen ? "80%" : "450px",
                    fontSize: "1rem",
                    color: "white",
                    background: "#C21010",
                    textTransform: "inherit",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#C21010",
                      border: "1px solid #C21010",
                    },
                    marginTop: "10px",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
                {err && <span>Something went wrong</span>}
              </Box>
            </Box>
          </form>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography>
              Already have an account?
              <Button
                sx={{
                  textTransform: "inherit",
                  fontSize: "1rem",
                }}
                onClick={handleClick}
              >
                Login
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Signup;
