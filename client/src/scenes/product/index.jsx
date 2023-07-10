import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import axios from "axios";

function Product() {
  const [productUrl, setProductUrl] = useState();
  const fetchProductDetails = async (url) => {
    try {
      const response = await axios.get(url);
      const productDetails = response.data;
      console.log(productDetails);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleFetchProduct = () => {
    const productUrl = "https://example.com/product/123";
    fetchProductDetails(productUrl);
  };

  return (
    <Box>
      <Typography>Product Details</Typography>
      <TextField
        sx={{
          width: "200px",
        }}
        placeholder="enter product url"
      ></TextField>
      <Button onClick={handleFetchProduct}>Submit</Button>
    </Box>
  );
}

export default Product;
