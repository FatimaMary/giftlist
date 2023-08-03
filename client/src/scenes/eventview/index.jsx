import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Santa from "../santasurprise/santa3.jpg";
import Avatar from "@mui/material/Avatar";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Mail from "./mail12.svg";
import Edit from "./editicblue.svg";
import Gift from "./gift12.svg";
import Santa1 from "./santa12.svg";
import Footer from "../../Components/Footer";
import Participants from "../participants";
import Invite from "../success/invite";
import EditEvent from "./editEvent";
import MyWishes from "../mywishes";
import Messages from "../messages";

function EventView() {
  const [eventDetails, setEventDetails] = useState({});
  const [name, setName] = useState([]);
  const [players, setPlayers] = useState([]);
  const [invitePage, setInvitePage] = useState(false);
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("eventId");
  const playerUserId = searchParam.get("userId");
  const [activeTab, setActiveTab] = useState(0);
  const [editPage, setEditPage] = useState(false);
  const [drawnNames, setDrawnNames] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [receiver, setReceiver] = useState([]);
  const [participantsId, setParticipantsId] = useState(0);
  const [productDetails, setProductDetails] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Set breakpoint based on your needs

  console.log("player user id: ", playerUserId);

  useEffect(() => {
    axios.get(`http://localhost:2309/event/get/${eventId}`).then((response) => {
      console.log("Get response: ", response);
      console.log("Get response data: ", response.data);
      setEventDetails(response.data);
      setIsButtonDisabled(response.data.drawNames);
      // console.log("Event Details value: ", eventDetails);
      if (response.data.drawNames === true) {
        axios
          .get(`http://localhost:2309/user/get/${playerUserId}`)
          .then((res) => {
            console.log("User Name by userId: ", res.data);
            const filteredNames = response.data.drawnNames.filter(
              (name) => name.giver === res.data.firstName
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
    axios
      .get(`http://localhost:2309/event/user/${eventId}`)
      .then((response) => {
        console.log("User Name get response: ", response);
        console.log("user name get response data: ", response.data);
        setName(response.data);
      });
    axios.get(`http://localhost:2309/player/${eventId}`).then((response) => {
      console.log("Participants List: ", response.data);
      setPlayers(response.data);
    });
    axios
      .get(`http://localhost:2309/player/id/${playerUserId}?eventId=${eventId}`)
      .then((response) => {
        console.log("ParticipantsId: ", response.data[0]);
        setParticipantsId(response.data[0]);
        axios
          .get(`http://localhost:2309/product/all/${response.data[0]}`)
          .then((res) => {
            console.log("Product Details: ", res.data);
            setProductDetails(res.data);
          });
      });
  }, []);

  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}`,
    };
  }

  const handleTabActive = (index) => {
    setActiveTab(index);
  };

  const handleDrawNames = () => {
    axios
      .get(`http://localhost:2309/player/drawn/${eventId}`)
      .then((response) => {
        console.log("drawn names response: ", response.data);
        setDrawnNames(response.data);
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        width: "100%",
        padding: isMobile ? "30px 15px 33px 15px" : "50px 30px 33px 30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: isMobile ? "center" : "space-between",
          maxWidth: isMobile ? "100%" : "800px",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Box>
          <img
            src={Santa}
            alt="santa image"
            height={200}
            width={250}
            className={isMobile ? "" : "starimage"}
            style={{
              display: isMobile ? "flex" : "",
              alignItems: isMobile ? "center" : "",
              justifyContent: isMobile ? "center" : "",
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
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "15px",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: "28px",
                lineHeight: "34px",
                marginBottom: 0,
                maxWidth: "73%",
                fontWeight: 600,
                color: "#101a34",
                marginBottom: isMobile ? "4px" : 0,
              }}
            >
              {eventDetails.eventName}
            </Typography>
            {eventDetails.userId !== playerUserId ? null : (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                  gap: isMobile ? "5px" : "0px",
                }}
              >
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
                  }}
                  onClick={() => setInvitePage(true)}
                >
                  <ShareOutlinedIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                      marginRight: "5px",
                    }}
                  />
                  Invite
                </Button>
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
                    background: "#fafbfd",
                    color: "#101a34",
                    border: "1px solid #cad3dd",
                    textTransform: "inherit",
                    "&:hover": {
                      color: "#C21010",
                      border: "1px solid #C21010",
                    },
                  }}
                  onClick={() => setEditPage(true)}
                >
                  <EditCalendarOutlinedIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                      marginRight: "5px",
                    }}
                  />
                  Edit
                </Button>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "felx-start",
              alignItems: isMobile ? "" : "center",
              marginBottom: "22px",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                lineHeight: "16px",
                color: "#5e6577",
                paddingRight: "15px",
                marginRight: "15px",
                borderRight: "1px solid #cad3dd",
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
                borderRight: "1px solid #cad3dd",
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
                  // flexBasis: 'calc(100% - 48px)',
                  // maxWidth: 'calc(100% - 48px)',
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
                  {players.length <= 2 ? (
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
                          "&: disabled": {
                            color: "black",
                            border: "1px solid black",
                            background: "none",
                            opacity: 0.5,
                          },
                        }}
                        onClick={handleDrawNames}
                        disabled
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
                          "&: disabled": {
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
              borderBottom: "1px solid #cad3dd",
            }}
          >
            <Typography
              sx={{
                height: "20px",
                overflow: "hidden",
                maxWidth: "500px",
                wordBreak: "break-word",
                margin: "0px",
              }}
            >
              {eventDetails.details}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          isActive={activeTab === 0}
          className={`tab ${activeTab === 0 ? "active" : ""}`}
          sx={{
            color: "#101a34",
            fontWeight: 600,
            fontSize: isMobile ? "13px" : "17px",
            lineHeight: "22px",
            textAlign: "center",
            marginRight: isMobile ? "10px" : "20px",
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
          className={`tab ${activeTab === 1 ? "active" : ""}`}
          sx={{
            color: "#101a34",
            fontWeight: 600,
            fontSize: isMobile ? "13px" : "17px",
            lineHeight: "22px",
            textAlign: "center",
            marginRight: isMobile ? "10px" : "20px",
            padding: "0 0 6px",
            "&:hover": {
              cursor: "pointer",
            },
            // '&.active' : {
            //     borderBottom: '3px solid skyblue'
            // }
          }}
          onClick={() => handleTabActive(1)}
        >
          Participants
        </Typography>
        <Typography
          isActive={activeTab === 2}
          className={`tab ${activeTab === 2 ? "active" : ""}`}
          sx={{
            color: "#101a34",
            fontWeight: 600,
            fontSize: isMobile ? "13px" : "17px",
            lineHeight: "22px",
            textAlign: "center",
            marginRight: isMobile ? "10px" : "20px",
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
          className={`tab ${activeTab === 3 ? "active" : ""}`}
          sx={{
            color: "#101a34",
            fontWeight: 600,
            fontSize: isMobile ? "13px" : "17px",
            lineHeight: "22px",
            textAlign: "center",
            marginRight: isMobile ? "10px" : "20px",
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
      {activeTab === 0 && (
        <Box
          sx={{
            padding: "15px 0",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Box
            sx={{
              width: isMobile ? "100%" : "48%",
              padding: "24px 16px",
              background: "#fff",
              border: "1px solid #e8ecf1",
              borderRadius: "10px",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                lineHeight: "25px",
                paddingBottom: "16px",
                marginBottom: "16px",
                borderBottom: "1px solid #e8ecf1",
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
                }}
              >
                {!isButtonDisabled ? (
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
                Name to be drawn by the organizer
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginBottom: "10px",
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
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginBottom: "10px",
                }}
              >
                <CancelOutlinedIcon
                  sx={{
                    color: "red",
                    width: "18px",
                    height: "18px",
                  }}
                />
                Update your gift delivery perference
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: isMobile ? "100%" : "50%",
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
                  // gap: '5px'
                }}
              >
                <img
                  src={Mail}
                  style={{ filter: "hue-rotate(180deg)", paddingRight: "10px" }}
                />
                <Box>
                  <Typography
                    sx={{
                      // marginBottom: '2px',
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
              <Box
                sx={{
                  flexBasis: "125px",
                  maxWidth: "125px",
                }}
              >
                <Button
                  sx={{
                    marginBottom: 0,
                    color: "#C21010",
                    background: "#fafbfd",
                    border: "1px solid #cad3dd",
                    padding: "8px 12px",
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: "18px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "auto",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      cursor: "pointer",
                    },
                    textTransform: "inherit",
                  }}
                >
                  <img
                    src={Edit}
                    style={{
                      width: "17px",
                      height: "17px",
                      marginRight: "5px",
                      // background: '#C21010',
                      filter: "hue-rotate(180deg)",
                    }}
                  />
                  Edit RSVP
                </Button>
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
                      flexBasis: "calc(100% - 134px)",
                      maxWidth: "calc(100% - 134px)",
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
                      flexBasis: "calc(100% - 134px)",
                      maxWidth: "calc(100% - 134px)",
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
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      flexBasis: "125px",
                      maxWidth: "125px",
                    }}
                  >
                    <Button
                      sx={{
                        marginBottom: 0,
                        color: "#C21010",
                        background: "#fafbfd",
                        border: "1px solid #cad3dd",
                        padding: "8px 12px",
                        fontWeight: 600,
                        fontSize: "12px",
                        lineHeight: "18px",
                        borderRadius: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "auto",
                        whiteSpace: "nowrap",
                        "&:hover": {
                          cursor: "pointer",
                        },
                        textTransform: "inherit",
                      }}
                    >
                      <img
                        src={Edit}
                        style={{
                          width: "17px",
                          height: "17px",
                          marginRight: "5px",
                          filter: "hue-rotate(180deg)",
                        }}
                      />
                      Gift Delivery
                    </Button>
                  </Box>
                </Box>{" "}
              </>
            ) : (
              <></>
            )}
          </Box>{" "}
        </Box>
      )}
      {activeTab === 1 && (
        <Box>
          <Participants />
        </Box>
      )}
      {activeTab === 2 && (
        <Box>
          <Messages eventId={eventId} userId={playerUserId} />
        </Box>
      )}
      {activeTab === 3 && (
        <Box>
          <MyWishes eventId={eventId} userId={playerUserId} />
        </Box>
      )}
      <Footer />
      <Invite
        open={invitePage}
        onClose={() => setInvitePage(false)}
        setInvitePage={setInvitePage}
        firstName={name.firstName}
        rsvpDate={eventDetails.rsvpDate}
        eventName={eventDetails.eventName}
        eventId={eventId}
      />
      <EditEvent
        open={editPage}
        onClose={() => setEditPage(false)}
        eventId={eventId}
      />
    </Box>
  );
}

export default EventView;
