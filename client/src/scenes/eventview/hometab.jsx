import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import HomeTabLeft from "./hometableft";
import HomeTabRight from "./hometabright";

function HomeTab({
  eventId,
  playerUserId,
  setRsvpDate,
  setEventDatePassed,
  setIsButtonDisabled,
  setReceiver,
  setGiver,
  setName,
  setPlayers,
  setParticipantsId,
  setProductDetails,
  players,
  productDetails,
  receiver,
  giver,
  eventDatePassed,
}) {
  const [eventDetails, setEventDetails] = useState({});
  const currentDate = new Date();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/event/get/${eventId}`)
      .then((response) => {
        console.log("Get response: ", response);
        console.log("Get response data: ", response.data);
        setEventDetails(response.data);
        if (response.data.rsvpDate && currentDate) {
          const rsvpDate = new Date(response.data.rsvpDate);
          const isRSVPDatePassed = currentDate > rsvpDate;
          setRsvpDate(isRSVPDatePassed);
          console.log("rsvp passed: ", isRSVPDatePassed);
        }
        if (response.data.giftExchangeDate && currentDate) {
          const eventDate = new Date(response.data.giftExchangeDate);
          const isEventDatePassed = currentDate > eventDate;
          setEventDatePassed(isEventDatePassed);
          console.log("Event Date Passed: ", isEventDatePassed);
        }
        setIsButtonDisabled(response.data.drawNames);
        if (response.data.drawNames === true) {
          axios
            .get(`${process.env.REACT_APP_BASE_URL}/user/get/${playerUserId}`)
            .then((res) => {
              console.log("User Name by userId: ", res.data);
              const userFullName =
                res.data.firstName +
                (res.data.secondName ? " " + res.data.secondName : "");

              // Filter drawnNames to find receiver and giver names
              const receiverFilteredNames = response.data.drawnNames.filter(
                (name) => name.giver === userFullName
              );
              const giverFilteredNames = response.data.drawnNames.filter(
                (name) => name.receiver === userFullName
              );

              // Update state if names are found
              if (receiverFilteredNames.length > 0) {
                console.log("Receiver: ", receiverFilteredNames[0].receiver);
                const receiverName = receiverFilteredNames[0].receiver;
                setReceiver(receiverName);
              }

              if (giverFilteredNames.length > 0) {
                console.log("Giver: ", giverFilteredNames[0].giver);
                const giverName = giverFilteredNames[0].giver;
                setGiver(giverName);
              }
            });
        }
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/event/user/${eventId}`)
      .then((response) => {
        console.log("User Name get response: ", response);
        console.log("user name get response data: ", response.data);
        setName(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/player/${eventId}`)
      .then((response) => {
        console.log("Participants List: ", response.data);
        setPlayers(response.data);
      });
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/player/id/${playerUserId}?eventId=${eventId}`
      )
      .then((response) => {
        console.log("ParticipantsId: ", response.data[0]);
        setParticipantsId(response.data[0]);
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}/product/all/${response.data[0]}`
          )
          .then((res) => {
            console.log("Product Details: ", res.data);
            setProductDetails(res.data);
          });
      });
  }, []);

  return (
    <Box
      sx={{
        padding: "15px 0",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        flexDirection: isSmallScreen ? "column" : "row",
        gap: isSmallScreen ? "10px" : 0,
      }}
    >
      <HomeTabLeft
        eventDetails={eventDetails}
        playerUserId={playerUserId}
        players={players}
        productDetails={productDetails}
        eventId={eventId}
      />
      <HomeTabRight
        eventDatePassed={eventDatePassed}
        eventDetails={eventDetails}
        receiver={receiver}
        giver={giver}
      />
    </Box>
  );
}

export default HomeTab;
