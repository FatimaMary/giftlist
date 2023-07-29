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
  const [userDetails, setUserDetails] = useState([]);
  const [messageDetails, setMessageDetails] = useState([]);
  const [message, setMessage] = useState();
  const [participantsId, setParticipantsId] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:2309/player/id/${userId}?eventId=${eventId}`)
      .then((response) => {
        console.log("ParticipantsId: ", response.data[0]);
        setParticipantsId(response.data[0]);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:2309/msg/all/${eventId}`)
      .then((response) => {
        const userPromises = response.data.map((message) => {
          return axios.get(`http://localhost:2309/user/get/${message.userId}`);
        });

        Promise.all(userPromises)
          .then((userResponses) => {
            const users = userResponses.map((res) => res.data);
            setUserDetails(users);
            const joinData = response.data.map((message, index) => ({
              ...message,
              senderDetails: users[index],
            }));
            console.log("Message  response data: ", joinData);
            setMessageDetails(joinData);
          })
          .catch((error) => {
            console.error("Error fetching user details: ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching messages: ", error);
      });
  }, [eventId]);

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

  const messageSend = () => {
    axios
      .post("http://localhost:2309/msg/add", {
        message: message,
        userId: userId,
        eventId: eventId,
        participantsId: participantsId,
      })
      .then((response) => {
        console.log("Message send response: ", response.data);
        setMessage("");
      });
  };
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
            onClick={messageSend}
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
              {...stringAvatar(`${singleDetail.senderDetails.firstName}`)}
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
                {singleDetail.senderDetails.firstName}{" "}
                {singleDetail.senderDetails.secondName}
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
                {singleDetail.senderDetails.email}
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
