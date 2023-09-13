import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import React, { useState } from "react";

function TabsList() {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabActive = (index) => {
    setActiveTab(index);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        isActive={activeTab === 0}
        className={`tab ${activeTab === 0 ? "active" : "notactive"}`}
        sx={{
          color: "#101a34",
          fontWeight: 600,
          fontSize: isSmallScreen ? "13px" : "17px",
          lineHeight: "22px",
          textAlign: "center",
          marginRight: "20px",
          padding: "0 0 6px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => handleTabActive(0)}
      >
        Home
      </Typography>
      <Typography
        isActive={activeTab === 1}
        className={`tab ${activeTab === 1 ? "active" : "notactive"}`}
        sx={{
          color: "#101a34",
          fontWeight: 600,
          fontSize: isSmallScreen ? "13px" : "17px",
          lineHeight: "22px",
          textAlign: "center",
          marginRight: "20px",
          padding: "0 0 6px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => handleTabActive(1)}
      >
        Participants
      </Typography>
      <Typography
        isActive={activeTab === 2}
        className={`tab ${activeTab === 2 ? "active" : "notactive"}`}
        sx={{
          color: "#101a34",
          fontWeight: 600,
          fontSize: isSmallScreen ? "13px" : "17px",
          lineHeight: "22px",
          textAlign: "center",
          marginRight: "20px",
          padding: "0 0 6px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => handleTabActive(2)}
      >
        Messages
      </Typography>
      <Typography
        isActive={activeTab === 3}
        className={`tab ${activeTab === 3 ? "active" : "notactive"}`}
        sx={{
          color: "#101a34",
          fontWeight: 600,
          fontSize: isSmallScreen ? "13px" : "17px",
          lineHeight: "22px",
          textAlign: "center",
          marginRight: "20px",
          padding: "0 0 6px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => handleTabActive(3)}
      >
        My Wishes
      </Typography>
    </Box>
  );
}

export default TabsList;
