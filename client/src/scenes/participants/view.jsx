import React, { useEffect, useState } from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Card,
  CardContent,
  CardMedia,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import Gift from "../mywishes/gift.png";

function ViewWishes({ open, onClose, participantsId, firstName, secondName }) {
  const [productDetails, setProductDetails] = useState([]);
  console.log("participants Id: ", participantsId);
  useEffect(() => {
    axios
      .get(`http://localhost:2309/product/all/${participantsId}`)
      .then((res) => {
        console.log("Product Details: ", res.data);
        setProductDetails(res.data);
      })
      .catch((error) => {
        console.error("Error fetching product details: ", error);
      });
  }, []);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleProductClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    // <Box sx={{ width: "80%" }}>
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          maxWidth: "80%",
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">My Wishes</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "1080px",
        }}
      >
        {productDetails.map((singleDetail, i) => (
          <Card
            sx={{
              width: 250,
              height: "250px",
              m: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            key={i}
          >
            <CardContent>
              <Box
                sx={{
                  height: "150px",
                  borderBottom: "1px solid grey",
                }}
              >
                <CardMedia
                  component="img"
                  // height="140"
                  image={Gift}
                  alt="Image Description"
                  sx={{
                    height: "125px",
                    width: "100px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "30px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  height: "100px",
                  background: "#FFEAEA",
                  p: "0.5rem",
                  "&:hover": {
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "underline",
                  },
                }}
              >
                <Typography>
                  {" "}
                  <a
                    style={{ textDecoration: "none" }}
                    href={singleDetail.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleProductClick(singleDetail.productUrl)}
                  >
                    <Typography>
                      {truncateText(singleDetail.productUrl, 65)}
                    </Typography>
                  </a>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </DialogContent>
    </Dialog>
    // </Box>
  );
}

export default ViewWishes;
