import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import Gift from "./gift.png";

function MyWishes({ eventId, userId }) {
  const [productUrl, setProductUrl] = useState();
  const [participantsId, setParticipantsId] = useState(0);
  const [productDetails, setProductDetails] = useState([]);

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

  useEffect(() => {
    axios
      .get(`http://localhost:2309/player/id/${userId}?eventId=${eventId}`)
      .then((response) => {
        console.log("ParticipantsId: ", response.data[0]);
        setParticipantsId(response.data[0]);
        axios
          .get(`http://localhost:2309/product/all/${response.data[0]}`)
          .then((res) => {
            console.log("Product Details: ", res.data);
            setProductDetails(res.data);
          });
      });
  }, []);

  const handleProductClick = (url) => {
    window.open(url, "_blank");
  };

  const handleAdd = () => {
    axios
      .post("http://localhost:2309/product/add", {
        productName: "",
        productUrl: productUrl,
        productPrice: "",
        description: "",
        eventId: eventId,
        participantsId: participantsId,
      })
      .then((response) => {
        console.log("Product Response: ", response.data);
        setProductUrl("");
        const newProductDetails = {
          productUrl: productUrl,
          eventId: eventId,
          participantsId: participantsId,
        };
        setProductDetails((previousProductDetails) => [
          ...previousProductDetails,
          newProductDetails,
        ]);
      });
  };

  const reversedProductDetails = [...productDetails].reverse();
  console.log("Reversed Product details: ", reversedProductDetails);

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
            border: "2px solid #C21010",
            textTransform: "none",
            "&:hover": {
              background: "white",
              color: "#C21010",
            },
          }}
          onClick={handleAdd}
        >
          <AddCircleOutlineIcon /> Add
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {reversedProductDetails.map((singleDetail, i) => (
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
      </Box>
    </Box>
  );
}

export default MyWishes;
