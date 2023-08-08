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

  const truncateText = (text, startIndex) => {
    const firstSlashIndex = text.indexOf("/");
    const secondSlashIndex = text.indexOf("/", firstSlashIndex + 1);
    const thirdSlashIndex = text.indexOf("/", secondSlashIndex + 1);
    const fourthSlashIndex = text.indexOf("/", thirdSlashIndex + 1);
    const productLink = text.substring(thirdSlashIndex + 1);
    const productFullName = productLink.split("?")[0].replace(/-/g, " ");

    const maxLength = fourthSlashIndex - thirdSlashIndex - 1;
    console.log("max length", maxLength);
    if (productFullName.length > maxLength) {
      const truncatedText = productFullName.substring(
        startIndex,
        startIndex + maxLength
      );
      return startIndex > 0 ? truncatedText + "..." : truncatedText + "...";
    }
    return productFullName;
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
                <Typography
                  onClick={() => handleProductClick(singleDetail.productUrl)}
                  sx={{
                    "&: hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  {truncateText(singleDetail.productUrl, 0)}
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
