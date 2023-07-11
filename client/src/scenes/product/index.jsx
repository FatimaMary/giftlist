import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import cheerio from "cheerio";

function Product() {
  const [productUrl, setProductUrl] = useState("");

  async function fetchProductDetails(url) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      // Parse the HTML and extract the product details using Cheerio selectors
      // Return the extracted product details
      console.log("title: ", $("title").text());
      console.log("price: ", $("#price").text());
      return {
        title: $("title").text(),
        price: $("#price").text(),
        // Add more properties as needed
      };
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  }

  const handleFetchProduct = () => {
    if (isValidUrl(productUrl)) {
      fetchProductDetails(productUrl);
    } else {
      console.error("Invalid URL:", productUrl);
    }
  };

  const handleUrlChange = (e) => {
    setProductUrl(e.target.value);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <Box>
      <Typography>Product Details</Typography>
      <TextField
        sx={{
          width: "200px",
        }}
        placeholder="Enter product URL"
        value={productUrl}
        onChange={handleUrlChange}
      />
      <Button onClick={handleFetchProduct}>Submit</Button>
    </Box>
  );
}

export default Product;
