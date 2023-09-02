import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Gift from "./gift.png";
import Footer from "../../Components/Footer";

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
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#cad3dd",
              },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& fieldset": {
                borderColor: "#cad3dd",
              },
            },
          },
        },
      },
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/event/${eventId}`, {
        budget: budget,
        details: details,
      })
      .then((response) => {
        console.log("update response: ", response);
        console.log("update data: ", response.data);
        navigate(`/success?userId=${userId}&eventId=${eventId}`);
      });
  };

  const handleClick = () => {
    navigate(`/eventcreate?userId=${userId}`);
  };

  return (
    <Box backgroundColor="#FFFDE3" width="100vw" p="50px 30px 33px 30px">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
        }}
        onClick={handleClick}
      >
        <ArrowCircleLeftOutlinedIcon
          sx={{
            fontSize: "1.2rem",
            color: "#C21010",
          }}
        />
        <Button
          sx={{
            textTransform: "inherit",
            color: "#C21010",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Step1
        </Button>
      </Box>
      <Box
        sx={{
          minHeight: "80vh",
          background: "#fff",
          border: "1px solid #e8ecf1",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            maxWidth: "517px",
            margin: "0 auto",
            padding: "48px 10px 16px",
          }}
        >
          <Box
            sx={{
              paddingBottom: "28px",
              marginBottom: "28px",
              borderBottom: "1px solid #cad3dd",
              textAlign: "center",
            }}
          >
            <img
              src={Gift}
              alt="Gift image"
              height={100}
              width={100}
              className="starimage"
            />
            <Typography
              variant="h4"
              sx={{
                margin: "0 0 20px",
                color: "#C21010",
              }}
            >
              Gift exchange rules
            </Typography>
          </Box>
          <Box>
            <Box
              sx={{
                marginBottom: "20px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins,sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#C21010",
                  wordBreak: "break-all",
                }}
              >
                Spending limit per gift
              </Typography>
              <ThemeProvider theme={theme}>
                <TextField
                  placeholder="Enter Min Budget"
                  sx={{
                    width: "100%",
                    background: "#fff",
                    borderRadius: "7px",
                    padding: "8px 15px",
                    fontWeight: 400,
                    fontSize: "1rem",
                    color: "#101a34",
                    lineHeight: "27px",
                    "& .MuiOutlinedInput-root": {
                      height: "44px",
                    },
                    marginLeft: "-13px",
                  }}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </ThemeProvider>
            </Box>
            <Box
              sx={{
                marginBottom: "20px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins,sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#C21010",
                  wordBreak: "break-all",
                }}
              >
                Other details(Optional)
              </Typography>
              <ThemeProvider theme={theme}>
                <TextField
                  placeholder="Enter your text"
                  multiline
                  rows={4}
                  sx={{
                    width: "100%",
                  }}
                  value={details}
                  onChange={(e) => setdetails(e.target.value)}
                />
              </ThemeProvider>
            </Box>
            <Box>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  border: "2px solid #C21010",
                  borderRadius: "10px",
                  width: "100%",
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
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Budget;
