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

  return (
    <Box sx={{ width: "80%" }}>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // sx={{
        //   maxWidth: "80%",
        // }}
      >
        <DialogTitle id="alert-dialog-title">My Wishes</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button> */}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ViewWishes;
