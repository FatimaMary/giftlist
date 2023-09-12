import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  CardContent,
  Card,
  CardMedia,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Santa from "./Santa.png";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Footer from "../../Components/Footer";
import { MyContext } from "../../Components/MyContext";
import "../../App.css";

function Home() {
  const [eventData, setEventData] = useState([]);
  const [searchParam] = useSearchParams();
  const userId = searchParam.get("userId");
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(MyContext);
  const currentDate = new Date();
  const dates = eventData.map((event) => event.giftExchangeDate);
  console.log("dates: ", dates);
  const [activeTab, setActiveTab] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [userName, setUserName] = useState();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const upcoming = eventData.filter((event) => {
      const eventDate = new Date(event.giftExchangeDate);
      return currentDate < eventDate;
    });
    console.log("upcoming: ", upcoming);
    const past = eventData.filter((event) => {
      const eventDate = new Date(event.giftExchangeDate);
      return currentDate > eventDate;
    });
    console.log("past: ", past);
    setUpcomingEvents(upcoming);
    setPastEvents(past);
  }, [eventData]);

  const comparisonResults = dates.map((date) => {
    const eventDate = new Date(date);
    const isCurrentDateBeforeEventDate = currentDate > eventDate;
    const isCurrentDateAfterEventDate = currentDate < eventDate;
    const areDatesEqual = currentDate.getTime() === eventDate.getTime();
    console.log("isCurrentDateBeforeEventDate: ", isCurrentDateBeforeEventDate);
    console.log("isCurrentDateAfterEventDate: ", isCurrentDateAfterEventDate);

    return {
      date: eventDate.toDateString(),
      isCurrentDateBeforeEventDate,
      isCurrentDateAfterEventDate,
      areDatesEqual,
    };
  });
  console.log("comparision results: ", comparisonResults);

  const afterEventDateCount = comparisonResults.filter(
    (result) => result.isCurrentDateAfterEventDate
  ).length;

  const beforeEventDateCount = comparisonResults.filter(
    (result) => result.isCurrentDateBeforeEventDate
  ).length;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/player/${userId}/event`)
      .then((response) => {
        console.log("dashboard response: ", response);
        setEventData(response.data);
      })
      .catch((err) => console.log("Error: ", err));
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn === "true") {
      setIsLoggedIn(true);
    }
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/get/${userId}`)
      .then((res) => {
        console.log("User Name by userId: ", res.data);
        const userFullName =
          res.data.firstName +
          (res.data.secondName ? " " + res.data.secondName : "");
        console.log("user Name: ", userFullName);
        setUserName(userFullName);
      });
  }, []);

  const handleClick = () => {
    navigate(`/eventcreate?userId=${userId}`);
  };

  const handleTabActive = (index) => {
    setActiveTab(index);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getAvatarContent = () => {
    if (typeof userName === "string" && userName.length > 0) {
      return userName.charAt(0);
    }
    return "";
  };

  return (
    <Box
      backgroundColor="#FFEAEA"
      width="100vw"
      p="50px 30px 33px 30px"
      minHeight="100vh"
      sx={{
        overflowY: "hidden",
      }}
    >
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              fontSize: "25px",
              color: "#C21010",
              wordBreak: "break-word",
              display: { xs: "none", md: "block" },
              marginBottom: "10px",
            }}
          >
            Welcome {userName}!
          </Typography>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              backgroundColor: "#C21010",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
              fontSize: "18px",
              marginBottom: "10px",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {getAvatarContent()}
            {isHovered && (
              <Box
                sx={{
                  position: "absolute",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "14px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                }}
              >
                {userName}
              </Box>
            )}
          </Box>
        </Box>
        {/* <Typography
          variant="h2"
          sx={{
            fontWeight: 600,
            fontSize: isSmallScreen ? "25px" : "32px",
            lineHeight: "34px",
            color: "#C21010",
            marginBottom: "16px",
            wordBreak: "break-word",
          }}
        >
          Santa Surprise
        </Typography> */}
        <Box
          sx={{
            display: "flex",
            background: "#fafbfd",
            padding: "5px 20px 20px",
            borderBottom: "1px solid #cad3dd",
            marginBottom: 0,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            gap: "10px",
          }}
        >
          <Typography
            isActive={activeTab === 0}
            className={`tab ${activeTab === 0 ? "active" : "notactive"}`}
            onClick={() => handleTabActive(0)}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
              color: "#101a34",
              fontSize: "17px",
            }}
            variant="body2"
          >
            Upcoming({afterEventDateCount})
          </Typography>
          <Typography
            isActive={activeTab === 1}
            className={`tab ${activeTab === 1 ? "active" : "notactive"}`}
            onClick={() => handleTabActive(1)}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
              color: "#101a34",
            }}
          >
            Past({beforeEventDateCount})
          </Typography>
        </Box>
        {activeTab === 0 && (
          <Box
            sx={{
              display: "flex",
              background: "#ffffff",
              minHeight: "80vh",
              borderRadius: "0 0 15px 15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: isSmallScreen ? "10px" : "20px",
                padding: isSmallScreen ? "10px" : "20px",
                flexDirection: isSmallScreen ? "column" : "initial",
              }}
            >
              <Box
                sx={{
                  width: isSmallScreen ? "250px" : 220,
                  height: isSmallScreen ? "120px" : "230px",
                  m: isSmallScreen ? "1rem" : "1.5rem",
                  // m: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: isSmallScreen ? "10px" : "30px",
                  border: "1px solid lightgrey",
                  "&:hover": {
                    backgroundColor: "#E64848",
                    color: "white",
                  },
                  borderRadius: "10px",
                  padding: "0 12px",
                  boxSizing: "border-box",
                }}
                onClick={handleClick}
              >
                <AddCircleOutlineIcon
                  sx={{
                    fontSize: isSmallScreen ? "1.5rem" : "3rem",
                  }}
                />
                <Typography>Create a new event</Typography>
              </Box>
              {upcomingEvents.map((cardData, i) => (
                <Card
                  sx={{
                    // width: isSmallScreen ? "90%" : 220,
                    width: isSmallScreen ? "250px" : 220,
                    height: isSmallScreen ? "160px" : "230px",
                    m: isSmallScreen ? "1rem" : "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                    flexDirection: isSmallScreen ? "column" : "initial",
                  }}
                  key={i}
                  onClick={() =>
                    navigate(
                      `/eventview?eventId=${cardData.eventId}&userId=${userId}`
                    )
                  }
                >
                  <CardContent>
                    <Box
                      sx={{
                        height: "60%",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={Santa}
                        alt="Image Description"
                        sx={{
                          height: isSmallScreen ? "100%" : "100%",
                          width: isSmallScreen ? "50%" : "80%",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        borderTop: "1px solid #FFEAEA",
                        height: "40%",
                        width: "250px",
                        background: "#FFEAEA",
                        display: "flex",
                        flexDirection: "column",
                        padding: isSmallScreen ? "10px 20px" : "20px 30px",
                        "&:hover": {
                          backgroundColor: "#C21010",
                          color: "white",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 16,
                          opacity: 0.7,
                          "&:hover": {
                            opacity: 1,
                          },
                        }}
                        variant="h6"
                        fontWeight="bold"
                      >
                        <CalendarMonthIcon
                          sx={{
                            fontSize: "20px",
                          }}
                        />
                        {cardData.giftExchangeDate}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {cardData.eventName}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
        {activeTab === 1 ? (
          pastEvents.length === 0 ? (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                fontSize: "16px",
                color: "#C21010",
                background: "#ffffff",
                height: "80vh",
                padding: "30px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              No past events found.
            </Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                background: "#ffffff",
                borderRadius: "0 0 15px 15px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: isSmallScreen ? "10px" : "20px",
                  marginLeft: isSmallScreen ? "0px" : "30px",
                }}
              >
                {/* {pastEvents.map((cardData, i) => (
                  <Card
                    sx={{
                      width: 220,
                      height: isSmallScreen ? "180px" : "230px",
                      m: isSmallScreen ? ".5rem" : "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "10px",
                    }}
                    key={i}
                    onClick={() =>
                      navigate(
                        `/eventview?eventId=${cardData.eventId}&userId=${userId}`
                      )
                    }
                  >
                    <CardContent>
                      <Box
                        sx={{
                          height: "70%",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={Santa}
                          alt="Image Description"
                          sx={{
                            height: isSmallScreen ? "70%" : "100%",
                            width: isSmallScreen ? "60%" : "80%",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          borderTop: "1px solid #FFEAEA",
                          height: "30%",
                          width: "220px",
                          background: "#FFEAEA",
                          display: "flex",
                          flexDirection: "column",
                          padding: isSmallScreen ? "10px 5px" : "20px 30px",
                          "&:hover": {
                            backgroundColor: "#C21010",
                            color: "white",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 16,
                            opacity: 0.7,
                            "&:hover": {
                              opacity: 1,
                            },
                          }}
                          variant="h6"
                          fontWeight="bold"
                        >
                          <CalendarMonthIcon
                            sx={{
                              fontSize: "20px",
                            }}
                          />
                          {cardData.giftExchangeDate}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {cardData.eventName}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))} */}
                {pastEvents.map((cardData, i) => (
                  <Card
                    sx={{
                      // width: isSmallScreen ? "90%" : 220,
                      width: isSmallScreen ? "250px" : 220,
                      height: isSmallScreen ? "160px" : "230px",
                      m: isSmallScreen ? "1rem 1.5rem" : "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "10px",
                      flexDirection: isSmallScreen ? "column" : "initial",
                    }}
                    key={i}
                    onClick={() =>
                      navigate(
                        `/eventview?eventId=${cardData.eventId}&userId=${userId}`
                      )
                    }
                  >
                    <CardContent>
                      <Box
                        sx={{
                          height: "60%",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={Santa}
                          alt="Image Description"
                          sx={{
                            height: isSmallScreen ? "100%" : "100%",
                            width: isSmallScreen ? "50%" : "80%",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          borderTop: "1px solid #FFEAEA",
                          height: "40%",
                          width: "250px",
                          background: "#FFEAEA",
                          display: "flex",
                          flexDirection: "column",
                          padding: isSmallScreen ? "10px 20px" : "20px 30px",
                          "&:hover": {
                            backgroundColor: "#C21010",
                            color: "white",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 16,
                            opacity: 0.7,
                            "&:hover": {
                              opacity: 1,
                            },
                          }}
                          variant="h6"
                          fontWeight="bold"
                        >
                          <CalendarMonthIcon
                            sx={{
                              fontSize: "20px",
                            }}
                          />
                          {cardData.giftExchangeDate}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {cardData.eventName}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          )
        ) : null}
      </>
      <Footer sx={{ marginTop: "auto" }} />
    </Box>
  );
}

export default Home;
