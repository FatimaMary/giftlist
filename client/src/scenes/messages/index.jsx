import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

function Messages() {
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
          }}
        >
          <TextField
            placeholder="Enter your message text"
            sx={{
              height: "46px",
              background: "#fff",
              borderRadius: "7px",
              padding: "8px 15px",
              fontWeight: 400,
              fontSize: "16px",
              color: "#101a34",
              border: "1px solid #cad3dd",
            }}
          />
          <Button>
            <MailOutlineIcon />
            Send message
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Messages;
