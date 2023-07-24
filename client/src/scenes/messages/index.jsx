import React from "react";
import {
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
      <Box></Box>
    </Box>
  );
}

export default Messages;
