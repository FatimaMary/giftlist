import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import ButtonsTab from "./buttons";

function Details({
  eventDetails,
  playerUserId,
  rsvpDate,
  setEditPage,
  setInvitePage,
  isSmallScreen,
  isButtonDisabled,
  isDrawButtonVisible,
  handleDrawNames,
  name,
}) {
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}`,
    };
  }
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Avatar
            {...stringAvatar(`${name.firstName}`)}
            sx={{
              width: "40px",
              height: "40px",
              background: "#C21010",
              fontSize: "13px",
            }}
          />
          <Box
            sx={{
              paddingLeft: "12px",
            }}
          >
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "16px",
                color: "#818694",
                marginBottom: 0,
              }}
            >
              Organizer
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontSize: "17px",
                lineHeight: "22px",
                color: "#101a34",
                marginBottom: 0,
              }}
            >
              {name.firstName} {name.secondName ? name.secondName : ""}
            </Typography>
          </Box>
        </Box>
        <Box>
          {eventDetails.userId !== playerUserId ? null : (
            <>
              {!isDrawButtonVisible ? (
                <>
                  <Button
                    sx={{
                      marginRight: "12px",
                      padding: "8px 15px",
                      fontWeight: 600,
                      fontSize: "13px",
                      lineHeight: "18px",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      background: "#C21010",
                      color: "#fff",
                      border: "1px solid #C21010",
                      textTransform: "inherit",
                      "&:hover": {
                        color: "#C21010",
                      },
                      "&:disabled": {
                        color: "black",
                        border: "1px solid black",
                        background: "none",
                        opacity: 0.5,
                      },
                    }}
                    disabled
                    onClick={handleDrawNames}
                  >
                    Draw Names
                  </Button>{" "}
                </>
              ) : (
                <>
                  <Button
                    sx={{
                      marginRight: "12px",
                      padding: "8px 15px",
                      fontWeight: 600,
                      fontSize: "13px",
                      lineHeight: "18px",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      background: "#C21010",
                      color: "#fff",
                      border: "1px solid #C21010",
                      textTransform: "inherit",
                      "&:hover": {
                        color: "#C21010",
                      },
                      "&:disabled": {
                        color: "black",
                        border: "1px solid black",
                        background: "none",
                        opacity: 0.5,
                      },
                    }}
                    onClick={handleDrawNames}
                    disabled={isButtonDisabled}
                  >
                    Draw Names
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
      </Box>
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
