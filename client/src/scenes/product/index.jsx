// import React, { useState } from "react";
// import { Box, Typography, Button, TextField } from "@mui/material";
// import axios from "axios";

// function Product() {
//   const [productUrl, setProductUrl] = useState("");

//   const handleUrlChange = (e) => {
//     setProductUrl(e.target.value);
//   };

//   const fetchProductDetails = async (url) => {
//     try {
//       const response = await axios.get(url);
//       const productDetails = response.data;
//       console.log(productDetails);
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//     }
//   };

//   const handleFetchProduct = () => {
//     fetchProductDetails(productUrl);
//   };

//   return (
//     <Box>
//       <Typography>Product Details</Typography>
//       <TextField
//         sx={{
//           width: "200px",
//         }}
//         placeholder="enter product url"
//         value={productUrl}
//         onClick={handleUrlChange}
//       ></TextField>
//       <Button onClick={handleFetchProduct}>Submit</Button>
//     </Box>
//   );
// }

// export default Product;

import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import axios from "axios";

function Product() {
  const [productUrl, setProductUrl] = useState("");

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
