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

function ViewWishes({ open, onClose, participantsId }) {
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

  return (
    <Dialog
      sx={{
        margin: "0 361px",
        display: "flex",
        maxWidth: "80%",
        height: "500px",
      }}
      open={open}
      onClose={onClose}
    >
      <DialogContent
        sx={{
          background: "#fff",
          boxShadow: "5px 5px 25px -5px rgba(32, 32, 36, .1)",
          borderRadius: "10px",
          padding: "24px 20px",
          display: "flex",
          // flexDirection: "column",
          // width: "2080px",
          flexWrap: "wrap",
          justifyContent: "center",
          border: "1px solid #cad3dd",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e8ecf1",
            flexWrap: "wrap",
            padding: "0 0 16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              // width: "300px",
            }}
          >
            {productDetails.map((singleDetail, i) => (
              <Card
                sx={{
                  width: 280,
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
                      height: "60%",
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
                        // marginTop: '10px',
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      height: "40%",
                      background: "#FFEAEA",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // textAlign: "center",
                      p: "0.5rem",
                      "&:hover": {
                        backgroundColor: "#C21010",
                        color: "white",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Typography>{singleDetail.productUrl}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ViewWishes;
