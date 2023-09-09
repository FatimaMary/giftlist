import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import Light from "./bow.png";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Footer from "../../Components/Footer";
import CopyInvitation from "../copyinvitation";
import axios from "axios";
import { MyContext } from "../../Components/MyContext";

function Success() {
  const [show, setShow] = useState(false);
  const [eventDetails, setEventDetails] = useState([]);
  const [user, setUser] = useState([]);
  const [searchParam] = useSearchParams();
  const userId = searchParam.get("userId");
  const eventId = searchParam.get("eventId");
  const [invitePage, setInvitePage] = useState(true);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(MyContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = () => {
    navigate(`/home?userId=${userId}`);
  };

  const moveToEventview = () => {
    navigate(`/eventview?eventId=${eventId}&userId=${userId}`);
  };

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn === "true") {
      setIsLoggedIn(true);
    }
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/event/get/${eventId}`)
      .then((response) => {
        console.log("Success Event Details: ", response.data);
        setEventDetails(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/event/user/${eventId}`)
      .then((response) => {
        const userFullName =
          response.data.firstName +
          (response.data.secondName ? " " + response.data.secondName : "");

        setUser(userFullName);
      });
  }, []);

  return (
    <Box backgroundColor="#FFEAEA" width="100vw" p="50px 30px 33px 30px">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
        }}
        onClick={handleClick}
      >
        <ArrowCircleLeftOutlinedIcon
          sx={{
            fontSize: "1.2rem",
            color: "#C21010",
          }}
        />
        <Button
          sx={{
            textTransform: "inherit",
            color: "#C21010",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Santa Surprise
        </Button>
      </Box>
      <Box
        sx={{
          minHeight: "80vh",
          background: "#fff",
          border: "1px solid #FFEAEA",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            maxWidth: "517px",
            margin: "0 auto",
            padding: "48px 10px 16px",
          }}
        >
          <Box
            sx={{
              paddingBottom: "28px",
              marginBottom: "28px",
              borderBottom: "1px solid #cad3dd",
              textAlign: "center",
            }}
          >
            <img
              src={Light}
              alt="Light image"
              height={150}
              width={125}
              className="starimage"
            />
            <Typography
              variant="h4"
              color="#C21010"
              sx={{
                fontWeight: 600,
                fontSize: isSmallScreen ? "20px" : "30px",
              }}
            >
              Your event has been created!
            </Typography>
            <Typography
              color="#C21010"
              sx={{
                margin: "0 0 10px",
              }}
            >
              Santa Surprises need at least 3 participants
            </Typography>
          </Box>
          <Box>
            <Button
              onClick={moveToEventview}
              variant="contained"
              sx={{
                border: "2px solid #C21010",
                borderRadius: "10px",
                width: "100%",
                fontSize: "1rem",
                color: "white",
                background: "#C21010",
                textTransform: "inherit",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#C21010",
                  border: "1px solid #C21010",
                },
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              View Santa Surprise
            </Button>
          </Box>
          <Box></Box>
          <Box
            sx={{
              borderRadius: "10px",
              width: "100%",
              fontSize: "1rem",
              color: "#C21010",
              textTransform: "inherit",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            <CopyInvitation
              eventName={eventDetails.eventName}
              firstName={user}
              rsvpDate={eventDetails.rsvpDate}
              eventId={eventId}
              setInvitePage={setInvitePage}
              giftExchangeDate={eventDetails.giftExchangeDate}
              budget={eventDetails.budget}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "5px solid #C21010",
            paddingBottom: "20px",
          }}
        ></Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Success;
