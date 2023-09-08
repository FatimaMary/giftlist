import React from "react";
import {
  Dialog,
  DialogContent,
  useTheme,
  useMediaQuery,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import CopyInvitation from "../copyinvitation";

function Invite({
  open,
  onClose,
  invitePage,
  setInvitePage,
  firstName,
  secondName,
  eventName,
  rsvpDate,
  eventId,
}) {
  const handleClose = () => {
    onClose(invitePage);
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      sx={{
        margin: isSmallScreen ? "0 50px" : "0 361px",
        display: "flex",
      }}
      open={open}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ color: "#C21010" }}>
          Invite More People
        </Typography>
        <Button
          sx={{ color: "black", fontSize: "16px", marginRight: "-7px" }}
          onClick={handleClose}
        >
          X
        </Button>
      </DialogTitle>
      <DialogContent
        sx={{
          background: "#fff",
          boxShadow: "5px 5px 25px -5px rgba(32, 32, 36, .1)",
          borderRadius: "10px",
          padding: isSmallScreen ? "10px 7px" : "24px 20px",
          display: "flex",
          flexDirection: "column",
          width: isSmallScreen ? "100%" : "500px",
          justifyContent: "center",
        }}
      >
        <CopyInvitation
          setInvitePage={setInvitePage}
          firstName={firstName}
          eventId={eventId}
          eventName={eventName}
          rsvpDate={rsvpDate}
          secondName={secondName}
        />
      </DialogContent>
    </Dialog>
  );
}

export default Invite;
