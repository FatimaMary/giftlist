import { Box, Typography } from "@mui/material";
import React from "react";
import ButtonsTab from "./buttons";
import DrawNameBtn from "./DrawNameBtn";

function Details({
  eventDetails,
  playerUserId,
  rsvpDate,
  setEditPage,
  setInvitePage,
  isSmallScreen,
  isButtonDisabled,
  handleDrawNames,
  name,
  isDrawButtonVisible,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        margin: "15px",
        borderBottom: "1px solid #cad3dd",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: isSmallScreen ? "flex-start" : "center",
          justifyContent: "space-between",
          marginBottom: "15px",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: isSmallScreen ? "24px" : "28px",
            lineHeight: "34px",
            marginBottom: 0,
            maxWidth: "73%",
            fontWeight: 600,
            color: "#101a34",
          }}
        >
          {eventDetails.eventName}
        </Typography>
        <ButtonsTab
          eventDetails={eventDetails}
          playerUserId={playerUserId}
          rsvpDate={rsvpDate}
          setEditPage={setEditPage}
          setInvitePage={setInvitePage}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "felx-start",
          alignItems: isSmallScreen ? "flex-start" : "center",
          marginBottom: "22px",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        <Typography
          sx={{
            fontSize: "13px",
            lineHeight: "16px",
            color: "#5e6577",
            paddingRight: "15px",
            marginRight: "15px",
            borderRight: isSmallScreen ? "none" : "1px solid #cad3dd",
          }}
        >
          Exchange gifts by:{" "}
          <span style={{ fontWeight: 600, color: "#101a34" }}>
            {eventDetails.giftExchangeDate}
          </span>
        </Typography>
        <Typography
          sx={{
            fontSize: "13px",
            lineHeight: "16px",
            color: "#5e6577",
            paddingRight: "15px",
            marginRight: "15px",
            borderRight: isSmallScreen ? "none" : "1px solid #cad3dd",
          }}
        >
          RSVP by:{" "}
          <span style={{ fontWeight: 600, color: "#101a34" }}>
            {eventDetails.rsvpDate}
          </span>
        </Typography>
        <Typography
          sx={{
            fontSize: "13px",
            lineHeight: "16px",
            color: "#5e6577",
            paddingRight: "15px",
            marginRight: "15px",
          }}
        >
          Gift budget:{" "}
          <span style={{ fontWeight: 600, color: "#101a34" }}>
            {eventDetails.budget}
          </span>
        </Typography>
      </Box>
      <DrawNameBtn
        eventDetails={eventDetails}
        playerUserId={playerUserId}
        isDrawButtonVisible={isDrawButtonVisible}
        handleDrawNames={handleDrawNames}
        isButtonDisabled={isButtonDisabled}
        name={name}
      />
      <Box
        sx={{
          fontSize: "15px",
          lineHeight: "140%",
          color: "#5e6577",
          paddingBottom: "17px",
          width: "600px",
          whiteSpace: "wrap",
        }}
      >
        <Typography
          sx={{
            height: "20px",
            margin: "10px",
          }}
        >
          {eventDetails.details}
        </Typography>
      </Box>
    </Box>
  );
}

export default Details;
