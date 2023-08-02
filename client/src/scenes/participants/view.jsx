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

  const truncateText = (text, maxLength, startIndex) => {
    if (text.length > maxLength) {
      const truncatedText = text.substring(startIndex, startIndex + maxLength);
      return startIndex > 0 ? truncatedText : truncatedText;
    }
    return text;
  };

  const handleProductClick = (url) => {
    window.open(url, "_blank");
  };

  return (
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
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 20px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "20px",
          }}
          variant="h5"
        >
          My Wishes
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "20px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          variant="h5"
          onClick={onClose}
        >
          X
        </Typography>
      </DialogTitle>
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
                }}
              >
                <Typography>
                  {truncateText(singleDetail.productUrl, 40, 22)}
                </Typography>
                <Typography
                  sx={{
                    "&:hover": {
                      textDecoration: "underline",
                      color: "blue",
                      cursor: "pointer",
                    },
                  }}
                >
                  <a
                    style={{ textDecoration: "none", color: "skyblue" }}
                    href={singleDetail.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleProductClick(singleDetail.productUrl)}
                  >
                    <Typography>
                      {truncateText(singleDetail.productUrl, 21, 0)}
                    </Typography>
                  </a>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </DialogContent>
    </Dialog>
  );
}

export default ViewWishes;
