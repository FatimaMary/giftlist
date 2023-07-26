import React from "react";
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

function Messages() {
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
            {...stringAvatar("Undefined")}
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
              Sender Name
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
              Sender Email
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
          <Typography variant="body1">hi</Typography>
        </Box>
        <Box
          sx={{
            flexBasis: "20%",
            maxWidth: "20%",
            paddingLeft: "20px",
            textAlign: "right",
          }}
        ></Box>
      </Box>
    </Box>
  );
}

export default Messages;
