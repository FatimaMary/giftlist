import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

function MyWishes({ eventId, userId }) {
  const [productUrl, setProductUrl] = useState();
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

  const handleAdd = () => {
    axios.post("http://localhost:2309/product/add", {
      productName: "",
      productUrl: productUrl,
      productPrice: "",
      description: "",
      eventId: eventId,
      participantsId: "",
    });
  };
  return (
    <Box
      sx={{
        padding: "15px 0",
        marginBottom: "20px",
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
        Add an item
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 0,
        }}
      >
        <ThemeProvider theme={theme}>
          <TextField
            placeholder="Enter a URL"
            sx={{
              maxWidth: "calc(100% - 130px)",
              flexBasis: "calc(100% - 130px)",
              background: "#fff",
              borderRadius: "10px",
              fontWeight: 400,
              fontSize: "16px",
              color: "#101a34",
              lineHeight: "27px",
              "& .MuiOutlinedInput-root": {
                height: "44px",
              },
            }}
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
          />
        </ThemeProvider>
        <Button
          sx={{
            background: "#C21010",
            borderRadius: "7px",
            fontSize: "15px",
            lineHeight: "22px",
            color: "#fff",
            padding: "10px 20px",
            border: "1px solid #C21010",
            textTransform: "none",
          }}
          onClick={handleAdd}
        >
          <AddCircleOutlineIcon /> Add
        </Button>
      </Box>
    </Box>
  );
}

export default MyWishes;
