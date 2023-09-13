import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Santa from "../home/Santa.png";
import Avatar from "@mui/material/Avatar";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import Invite from "../success/invite";
import EditEvent from "./editEvent";
import { MyContext, useDrawStatus } from "../../Components/MyContext";
import TabsList from "./tabsList";
import ButtonsTab from "./buttons";

function EventView() {
  const [eventDetails, setEventDetails] = useState({});
  const [name, setName] = useState([]);
  const [players, setPlayers] = useState([]);
  const [invitePage, setInvitePage] = useState(false);
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("eventId");
  const playerUserId = searchParam.get("userId");
  const [editPage, setEditPage] = useState(false);
  const [drawnNames, setDrawnNames] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [receiver, setReceiver] = useState([]);
  const [participantsId, setParticipantsId] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [rsvpDate, setRsvpDate] = useState(false);
  const currentDate = new Date();
  const [giver, setGiver] = useState([]);
  const [eventDatePassed, setEventDatePassed] = useState(false);
  const { getDrawStatus, setDrawStatus } = useDrawStatus();
  const drawStatus = getDrawStatus(eventId);
  console.log("player user id: ", playerUserId);
  const { setIsLoggedIn } = useContext(MyContext);
  const [productDetails, setProductDetails] = useState([]);

  const handleEventEdit = (editedEventData) => {
    console.log("Edited event Data: ", editedEventData);
    const editedRsvpDate = new Date(editedEventData.rsvpDate);
    const isRSVPDatePassed = currentDate > editedRsvpDate;
    console.log("edited Rsvp Date passed: ", isRSVPDatePassed);
    setRsvpDate(isRSVPDatePassed);
    setEventDetails(editedEventData);
    setEditPage(false);
  };

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn === "true") {
      setIsLoggedIn(true);
    }
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/event/get/${eventId}`)
      .then((response) => {
        console.log("Get response: ", response);
        console.log("Get response data: ", response.data);
        setEventDetails(response.data);
        setIsButtonDisabled(response.data.drawNames);
        if (response.data.drawNames === true) {
          axios
            .get(`${process.env.REACT_APP_BASE_URL}/user/get/${playerUserId}`)
            .then((res) => {
              console.log("User Name by userId: ", res.data);
              const filteredNames = response.data.drawnNames.filter(
                (name) =>
                  name.giver ===
                  res.data.firstName +
                    (res.data.secondName ? " " + res.data.secondName : "")
              );
              console.log("filtered Names: ", filteredNames);
              if (filteredNames.length > 0) {
                console.log("Receiver: ", filteredNames[0].receiver);
                const receiverName = filteredNames[0].receiver;
                setReceiver(receiverName);
              }
            });
        }
      });
  }, [drawStatus]);

  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}`,
    };
  }

  const handleDrawNames = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/player/drawn/${eventId}`)
      .then((response) => {
        console.log("drawn names response: ", response.data);
        setDrawnNames(response.data);
        setDrawStatus(eventId, !drawStatus);
      });
  };

  const isDrawButtonVisible = rsvpDate && players.length >= 3;
  console.log("isButton is visibile: ", isDrawButtonVisible);
  return (
    <Box
      backgroundColor="#FFEAEA"
      width="90vw"
      p="50px 30px 33px 30px"
      minHeight="100vh"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        <Box>
          <img
            src={Santa}
            alt="santa image"
            height={200}
            width={isSmallScreen ? "100%" : "250"}
            style={{
              margin: isSmallScreen ? "auto auto" : "0",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            margin: "15px",
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
            {/* {eventDetails.userId !== playerUserId ? null : ( */}
            {/* // <Box
              //   sx={{
              //     display: "flex",
              //     flexWrap: "wrap",
              //     justifyContent: "flex-end",
              //   }}
              // >
              //   {rsvpDate ? (
              //     <Button
              //       sx={{
              //         marginRight: "12px",
              //         padding: "8px 15px",
              //         fontWeight: 600,
              //         fontSize: "13px",
              //         lineHeight: "18px",
              //         borderRadius: "5px",
              //         display: "flex",
              //         alignItems: "center",
              //         background: "#C21010",
              //         color: "#fff",
              //         border: "1px solid #C21010",
              //         textTransform: "inherit",
              //         "&:hover": {
              //           color: "#C21010",
              //         },
              //         "&: disabled": {
              //           color: "black",
              //           border: "1px solid black",
              //           background: "none",
              //           opacity: 0.5,
              //         },
              //       }}
              //       onClick={() => setInvitePage(true)}
              //       disabled
              //     >
              //       {isSmallScreen ? (
              //         <ShareOutlinedIcon
              //           sx={{
              //             width: "16px",
              //             height: "16px",
              //             marginRight: "5px",
              //           }}
              //         />
              //       ) : (
              //         <>
              //           <ShareOutlinedIcon
              //             sx={{
              //               width: "16px",
              //               height: "16px",
              //               marginRight: "5px",
              //             }}
              //           />
              //           Invite{" "}
              //         </>
              //       )}
              //     </Button>
              //   ) : (
              //     <Button
              //       sx={{
              //         marginRight: "12px",
              //         padding: "8px 15px",
              //         fontWeight: 600,
              //         fontSize: "13px",
              //         lineHeight: "18px",
              //         borderRadius: "5px",
              //         display: "flex",
              //         alignItems: "center",
              //         background: "#C21010",
              //         color: "#fff",
              //         border: "1px solid #C21010",
              //         textTransform: "inherit",
              //         "&:hover": {
              //           color: "#C21010",
              //         },
              //       }}
              //       onClick={() => setInvitePage(true)}
              //     >
              //       {isSmallScreen ? (
              //         <ShareOutlinedIcon
              //           sx={{
              //             width: "16px",
              //             height: "16px",
              //             marginRight: "5px",
              //           }}
              //         />
              //       ) : (
              //         <>
              //           <ShareOutlinedIcon
              //             sx={{
              //               width: "16px",
              //               height: "16px",
              //               marginRight: "5px",
              //             }}
              //           />
              //           Invite{" "}
              //         </>
              //       )}
              //     </Button>
              //   )}
              //   {rsvpDate ? (
              //     <Button
              //       sx={{
              //         marginRight: "12px",
              //         padding: "8px 15px",
              //         fontWeight: 600,
              //         fontSize: "13px",
              //         lineHeight: "18px",
              //         borderRadius: "5px",
              //         display: "flex",
              //         alignItems: "center",
              //         background: "#fafbfd",
              //         color: "#101a34",
              //         border: "1px solid #cad3dd",
              //         textTransform: "inherit",
              //         "&:hover": {
              //           color: "#C21010",
              //           border: "1px solid #C21010",
              //         },
              //         "&: disabled": {
              //           color: "black",
              //           border: "1px solid black",
              //           background: "none",
              //           opacity: 0.5,
              //         },
              //       }}
              //       // onClick={() => setEditPage(true)}
              //       disabled
              //     >
              //       {isSmallScreen ? (
              //         <EditCalendarOutlinedIcon
              //           sx={{
              //             width: "16px",
              //             height: "16px",
              //             marginRight: "5px",
              //           }}
              //         />
              //       ) : (
              //         <>
              //           <EditCalendarOutlinedIcon
              //             sx={{
              //               width: "16px",
              //               height: "16px",
              //               marginRight: "5px",
              //             }}
              //           />
              //           Edit
              //         </>
              //       )}
              //     </Button>
              //   ) : (
              //     <Button
              //       sx={{
              //         marginRight: "12px",
              //         padding: "8px 15px",
              //         fontWeight: 600,
              //         fontSize: "13px",
              //         lineHeight: "18px",
              //         borderRadius: "5px",
              //         display: "flex",
              //         alignItems: "center",
              //         background: "#fafbfd",
              //         color: "#101a34",
              //         border: "1px solid #cad3dd",
              //         textTransform: "inherit",
              //         "&:hover": {
              //           color: "#C21010",
              //           border: "1px solid #C21010",
              //         },
              //       }}
              //       onClick={() => setEditPage(true)}
              //     >
              //       {isSmallScreen ? (
              //         <EditCalendarOutlinedIcon
              //           sx={{
              //             width: "16px",
              //             height: "16px",
              //             marginRight: "5px",
              //           }}
              //         />
              //       ) : (
              //         <>
              //           <EditCalendarOutlinedIcon
              //             sx={{
              //               width: "16px",
              //               height: "16px",
              //               marginRight: "5px",
              //             }}
              //           />
              //           Edit
              //         </>
              //       )}
              //     </Button>
              //   )}
              // </Box> */}
            <ButtonsTab
              eventDetails={eventDetails}
              playerUserId={playerUserId}
              rsvpDate={rsvpDate}
              setEditPage={setEditPage}
              setInvitePage={setInvitePage}
            />
            {/* // )} */}
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
            }}
          >
            <div
              style={{
                width: "800px",
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
            </div>
          </Box>
        </Box>
      </Box>
      <TabsList
        eventId={eventId}
        playerUserId={playerUserId}
        players={players}
        receiver={receiver}
        eventDatePassed={eventDatePassed}
        giver={giver}
        participantsId={participantsId}
        productDetails={productDetails}
        setProductDetails={setProductDetails}
        eventDetails={eventDetails}
      />
      <Footer sx={{ marginTop: "auto" }} />
      <Invite
        open={invitePage}
        onClose={() => setInvitePage(false)}
        setInvitePage={setInvitePage}
        firstName={name.firstName}
        secondName={name.secondName}
        rsvpDate={eventDetails.rsvpDate}
        eventName={eventDetails.eventName}
        eventId={eventId}
        giftExchangeDate={eventDetails.giftExchangeDate}
        budget={eventDetails.budget}
      />
      <EditEvent
        open={editPage}
        onClose={() => setEditPage(false)}
        eventId={eventId}
        onEdit={handleEventEdit}
      />
    </Box>
  );
}

export default EventView;
