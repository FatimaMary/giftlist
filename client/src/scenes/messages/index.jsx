import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";

function Messages({ eventId, userId }) {
  const [userDetails, setUserDetails] = useState({});
  const [messageDetails, setMessageDetails] = useState([]);
  console.log("user details1: ", userDetails);

  useEffect(() => {
    // axios.get(`http://localhost:2309/user/get/${userId}`).then((response) => {
    //   console.log("Message page user details: ", response.data);
    //   setUserDetails(response.data);
    // });
    console.log("user details: ", userDetails);
    axios.get(`http://localhost:2309/msg/all/${eventId}`).then((response) => {
      console.log("Messages response data: ", response.data);
      setMessageDetails(response.data);
      const user = axios
        .get(`http://localhost:2309/user/get/${response.data.userId}`)
        .then((res) => {
          console.log("Message page user details: ", res.data);
          setUserDetails(res.data);
          const joinData = [response.data];
          joinData.push({
            ...response.data,
            user,
          });
        });
    });
  }, []);

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

  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}`,
    };
  }

  return (
    <Box
      sx={{
        padding: "15px 0",
      }}
    >
      <Box
        sx={{
          marginBottom: "16px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "13px",
            lineHeight: "18px",
            color: "#101a34",
            marginBottom: "5px",
            wordBreak: "break-all",
          }}
        >
          Send a message to the group
        </Typography>
        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ThemeProvider theme={theme}>
            <TextField
              placeholder="Enter your message text"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "46px",
                  padding: "8px 15px",
                  width: "800px",
                },
                background: "#fff",
                borderRadius: "7px",
                fontWeight: 400,
                fontSize: "16px",
                color: "#101a34",
                border: "1px solid #cad3dd",
              }}
            />
          </ThemeProvider>
          <Button
            variant="outlined"
            sx={{
              width: "155px",
              height: "46px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 5px",
              textTransform: "inherit",
              color: "#fff",
              background: "#C12020",
            }}
          >
            <MailOutlineIcon />
            Send message
          </Button>
        </Box>
      </Box>
      {messageDetails.map((singleDetail, i) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 16px",
            background: "#fff",
            border: "1px solid #e8ecf1",
            borderRadius: "9px",
          }}
          key={i}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: "30%",
              paddingRight: "20px",
              flexWrap: "wrap",
            }}
          >
            <Avatar
              {...stringAvatar(`${singleDetail.firstName}`)}
              sx={{
                width: "26px",
                height: "26px",
                background: "#C21010",
                fontSize: "11px",
                marginBottom: 0,
                lineHeight: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "12px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "17px",
                  fontWeight: 600,
                  lineHeight: "22px",
                  color: "#101a34",
                  marginBottom: "4px",
                }}
              >
                {singleDetail.firstName} {singleDetail.secondName}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 400,
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#818694",
                }}
              >
                {singleDetail.email}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              borderRight: "1px solid #e8ecf1",
              borderLeft: "1px solid #e8ecf1",
              padding: "0 20px",
              fontSize: "17px",
              lineHeight: "140%",
              color: "#5e6577",
              flexBasis: "50%",
              maxWidth: "50%",
            }}
          >
            <Typography variant="body1">{singleDetail.message}</Typography>
          </Box>
          <Box
            sx={{
              flexBasis: "20%",
              maxWidth: "20%",
              paddingLeft: "20px",
              textAlign: "right",
              display: "flex",
            }}
          >
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#5e6577",
                  marginBottom: "7px",
                }}
              >
                {singleDetail.timeStamp}
                {/* time */}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#101a34",
                  marginBottom: 0,
                }}
              >
                Likes: 0
              </Typography>
            </Box>
            <Button>
              <FavoriteBorderIcon
                sx={{
                  color: "green",
                }}
              />
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Messages;
