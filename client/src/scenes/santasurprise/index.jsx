import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  CardContent,
  Card,
  CardMedia,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Santa from "./santa3.jpg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CopyrightIcon from "@mui/icons-material/Copyright";
import Footer from "../../Components/Footer";
import { MyContext } from "../../Components/MyContext";

function SantaSurprise() {
  const [eventData, setEventData] = useState([]);
  // const [dates, setDates] = useState([]);
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
      .get(`http://localhost:2309/player/${userId}/event`)
      .then((response) => {
        console.log("dashboard response: ", response);
        setEventData(response.data);
      })
      .catch((err) => console.log("Error: ", err));
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn === "true") {
      setIsLoggedIn(true);
      // navigate(`/giftexchange?userId=${res.user.uid}`); // or any other protected route
    }
  }, []);

  const handleClick = () => {
    navigate(`/eventcreate?userId=${userId}`);
  };

  const handleTabActive = (index) => {
    setActiveTab(index);
  };

  return (
    <Box
      backgroundColor="#FFEAEA"
      width="100vw"
      p="50px 30px 33px 30px"
      height="100%"
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 600,
          fontSize: "32px",
          lineHeight: "34px",
          color: "#C21010",
          marginBottom: "16px",
          wordBreak: "break-word",
        }}
      >
        Gift exchange
      </Typography>
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
          className={`tab ${activeTab === 0 ? "active" : ""}`}
          onClick={() => handleTabActive(0)}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Upcoming({afterEventDateCount})
        </Typography>
        <Typography
          isActive={activeTab === 1}
          className={`tab ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabActive(1)}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Past({beforeEventDateCount})
        </Typography>
      </Box>
      {activeTab === 0 && (
        <Box
          sx={{
            display: "flex",
            // flexWrap: 'wrap',
            background: "#ffffff",
            // marginY: '-12px',
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginLeft: "30px",
            }}
          >
            <Box
              sx={{
                width: 220,
                height: "250px",
                m: "1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "30px",
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
                  fontSize: "3rem",
                }}
              />
              <Typography>Create a new event</Typography>
            </Box>
            {upcomingEvents.map((cardData, i) => (
              <Card
                sx={{
                  width: 220,
                  height: "250px",
                  m: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                      // height="140"
                      image={Santa}
                      alt="Image Description"
                      sx={{
                        height: "100%",
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        // marginTop: '10px'
                      }}
                    />
                  </Box>
                  <Box
                    // padding='10px 15px'
                    sx={{
                      borderTop: "1px solid #FFEAEA",
                      height: "30%",
                      width: "220px",
                      background: "#FFEAEA",
                      display: "flex",
                      flexDirection: "column",
                      padding: "20px 30px",
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
      {activeTab === 1 && (
        <Box
          sx={{
            display: "flex",
            // flexWrap: 'wrap',
            background: "#ffffff",
            // marginY: '-12px',
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginLeft: "30px",
            }}
          >
            {pastEvents.map((cardData, i) => (
              <Card
                sx={{
                  width: 220,
                  height: "250px",
                  m: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                      // height="140"
                      image={Santa}
                      alt="Image Description"
                      sx={{
                        height: "100%",
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        // marginTop: '10px'
                      }}
                    />
                  </Box>
                  <Box
                    // padding='10px 15px'
                    sx={{
                      borderTop: "1px solid #FFEAEA",
                      height: "30%",
                      width: "220px",
                      background: "#FFEAEA",
                      display: "flex",
                      flexDirection: "column",
                      padding: "20px 30px",
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
      <Footer />
    </Box>
  );
}

export default SantaSurprise;
