import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useEffect, useState } from "react";
import { MyContext, useDrawStatus } from "../../Components/MyContext";
import axios from "axios";
import Mail from "./mail12.svg";
import Gift from "./gift12.svg";
import Santa1 from "./santa12.svg";

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
  const { getDrawStatus, setDrawStatus } = useDrawStatus();
  const drawStatus = getDrawStatus(eventId);
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
      <Box
        sx={{
          width: isSmallScreen ? "100%" : "48%",
          padding: "24px 16px",
          background: "#fff",
          border: "1px solid #e8ecf1",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: "20px",
            lineHeight: "25px",
            paddingBottom: "16px",
            marginBottom: "16px",
            borderBottom: "1px solid #e8ecf1",
            fontWeight: "bold",
          }}
        >
          Your gift exchange checklist
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            justifyContent: "center",
          }}
        >
          {eventDetails.userId !== playerUserId ? null : (
            <Typography
              sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: "10px",
                fontSize: isSmallScreen ? "12px" : "initial",
              }}
            >
              {players.length <= 2 ? (
                <CancelOutlinedIcon
                  sx={{
                    color: "red",
                    width: "18px",
                    height: "18px",
                  }}
                />
              ) : (
                <CheckCircleOutlineIcon
                  sx={{
                    color: "green",
                    width: "18px",
                    height: "18px",
                  }}
                />
              )}
              At least 3 participants joined
            </Typography>
          )}
          <Typography
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "10px",
              fontSize: isSmallScreen ? "12px" : "initial",
            }}
          >
            {eventDetails.userId !== playerUserId ? (
              <>
                {!eventDetails.drawNames ? (
                  <CancelOutlinedIcon
                    sx={{
                      color: "red",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                ) : (
                  <CheckCircleOutlineIcon
                    sx={{
                      color: "green",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                )}{" "}
              </>
            ) : (
              <>
                {" "}
                {drawStatus === false ? (
                  <CancelOutlinedIcon
                    sx={{
                      color: "red",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                ) : (
                  <CheckCircleOutlineIcon
                    sx={{
                      color: "green",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                )}
              </>
            )}
            Name to be drawn by the organizer
          </Typography>
          <Typography
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "10px",
              fontSize: isSmallScreen ? "12px" : "initial",
            }}
          >
            {productDetails.length === 0 ? (
              <CancelOutlinedIcon
                sx={{
                  color: "red",
                  width: "18px",
                  height: "18px",
                }}
              />
            ) : (
              <CheckCircleOutlineIcon
                sx={{
                  color: "green",
                  width: "18px",
                  height: "18px",
                }}
              />
            )}
            Add to your wish list
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: isSmallScreen ? "100%" : "50%",
          padding: "24px 16px",
          background: "#fff",
          border: "1px solid #e8ecf1",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            paddingBottom: "16px",
            marginBottom: "16px",
            borderBottom: "1px solid #e8ecf1",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              flexBasis: "calc(100% - 134px)",
              maxWidth: "calc(100% - 134px)",
              fontSize: "13px",
              lineHeight: "18px",
              color: "#5e6577",
              display: "flex",
            }}
          >
            <img
              src={Mail}
              style={{ filter: "hue-rotate(180deg)", paddingRight: "10px" }}
            />
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#101a34",
                  wordBreak: "break-all",
                }}
              >
                RSVP Status:
              </Typography>
              {eventDetails.confirmation === true ? (
                <>
                  <Typography
                    sx={{
                      marginBottom: 0,
                      fontSize: "13px",
                    }}
                  >
                    Participating
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      marginBottom: 0,
                      fontSize: "13px",
                    }}
                  >
                    Not Participating
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>
        {eventDetails.confirmation === true ? (
          <>
            <Box
              sx={{
                paddingBottom: "16px",
                marginBottom: "16px",
                borderBottom: "1px solid #e8ecf1",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  // flexBasis: "calc(100% - 134px)",
                  // maxWidth: "calc(100% - 134px)",
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#5e6577",
                  display: "flex",
                }}
              >
                <img
                  src={Gift}
                  style={{
                    paddingRight: "10px",
                    filter: "hue-rotate(180deg)",
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      marginBottom: "2px",
                      fontWeight: 600,
                      fontSize: "13px",
                      lineHeight: "18px",
                      color: "#101a34",
                      wordBreak: "break-all",
                    }}
                  >
                    You're giving to:
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: 0,
                      fontSize: "13px",
                    }}
                  >
                    {eventDetails.drawNames === true ? (
                      <> {receiver} </>
                    ) : (
                      <>
                        Check back after the draw date on{" "}
                        {eventDetails.rsvpDate}
                      </>
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                paddingBottom: "16px",
                marginBottom: "16px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  // flexBasis: "calc(100% - 134px)",
                  // maxWidth: "calc(100% - 134px)",
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#5e6577",
                  display: "flex",
                }}
              >
                <img
                  src={Santa1}
                  style={{
                    paddingRight: "10px",
                    filter: "hue-rotate(180deg)",
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "13px",
                      color: "#101a34",
                      wordBreak: "break-all",
                    }}
                  >
                    Your gift giver:
                  </Typography>
                  {eventDatePassed ? (
                    <>{giver}</>
                  ) : (
                    <Typography
                      sx={{
                        marginBottom: 0,
                        fontSize: "13px",
                      }}
                    >
                      Your gift giver will be revealed after the gift exchange
                      date set by the event organizer on{" "}
                      {eventDetails.giftExchangeDate}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>{" "}
          </>
        ) : (
          <></>
        )}
      </Box>{" "}
    </Box>
  );
}

export default HomeTab;
