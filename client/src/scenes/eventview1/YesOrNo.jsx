import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Participants from "../participants";

function YesOrNo({ isSmallScreen, eventId }) {
  const [activeTab, setActiveTab] = useState(0);
  const [yes, setYes] = useState();
  const [no, setNo] = useState();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [participantsId, setParticipantsId] = useState();
  const navigate = useNavigate();

  const handleTabActive = (index) => {
    setActiveTab(index);
  };

  const handleLogin = () => {
    navigate(`/login1?eventId=${eventId}&participantsId=${participantsId}`);
  };

  const handleSignup = () => {
    navigate(`/signup2?eventId=${eventId}&participantsId=${participantsId}`);
  };

  const handleNo = () => {
    setNo("no");
    setShow1(true);
  };

  const handleClick = () => {
    setShow(true);
    setYes("yes");
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/player/post`, {
        participantsAcceptence: "yes",
        eventId: eventId,
      })
      .then((response) => {
        console.log("participants response: ", response);
        console.log("participants response data: ", response.data);
        setParticipantsId(response.data.participantsId);
      });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          isActive={activeTab === 0}
          className={`tab ${activeTab === 0 ? "active" : "notactive"}`}
          sx={{
            color: "#101a34",
            fontWeight: 600,
            fontSize: isSmallScreen ? "13px" : "17px",
            lineHeight: "22px",
            textAlign: "center",
            marginRight: "20px",
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
          className={`tab ${activeTab === 1 ? "active" : "notactive"}`}
          sx={{
            color: "#101a34",
            fontWeight: 600,
            fontSize: isSmallScreen ? "13px" : "17px",
            lineHeight: "22px",
            textAlign: "center",
            marginRight: "20px",
            padding: "0 0 6px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => handleTabActive(1)}
        >
          Participants
        </Typography>
      </Box>
      {show ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              border: "1px solid grey",
              borderRadius: "10px",
              width: "280px",
              padding: "10px",
              fontSize: "1rem",
              color: "#0f7b9b",
              background: "#fff",
              textTransform: "inherit",
              fontWeight: "bold",
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "#101a34",
                fontWeight: 600,
                fontSize: "17px",
                lineHeight: "22px",
                textAlign: "center",
                marginRight: "20px",
                padding: "0 0 6px",
              }}
            >
              Awesome! Login or Sign up to confirm your RSVP
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Button
                variant="contained"
                onClick={handleLogin}
                sx={{
                  border: "2px solid #C21010",
                  borderRadius: "10px",
                  width: "48%",
                  fontSize: "1rem",
                  color: "white",
                  background: "#C21010",
                  textTransform: "inherit",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#C21010",
                    border: "1px solid #0f7b9b",
                  },
                  marginTop: "10px",
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={handleSignup}
                sx={{
                  border: "2px solid #C21010",
                  borderRadius: "10px",
                  width: "48%",
                  fontSize: "1rem",
                  color: "white",
                  background: "#C21010",
                  textTransform: "inherit",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#C21010",
                    border: "1px solid #0f7b9b",
                  },
                  marginTop: "10px",
                }}
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          {activeTab === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  border: "1px solid grey",
                  borderRadius: "10px",
                  width: "350px",
                  padding: "10px",
                  fontSize: "1rem",
                  color: "#0f7b9b",
                  background: "#fff",
                  textTransform: "inherit",
                  fontWeight: "bold",
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "24px 16px 16px 16px",
                }}
              >
                {show1 ? (
                  <Box
                    sx={{
                      color: "#C21010",
                      textAlign: "center",
                      fontSize: "16px",
                      letterSpacing: "1px",
                    }}
                  >
                    Thanks for your response
                  </Box>
                ) : (
                  <Box>
                    <Typography
                      sx={{
                        color: "#101a34",
                        fontWeight: 600,
                        fontSize: "17px",
                        lineHeight: "22px",
                        textAlign: "center",
                        marginRight: "20px",
                        padding: "0 0 6px",
                      }}
                    >
                      You're invited!
                    </Typography>
                    <Typography
                      sx={{
                        color: "#101a34",
                        // fontWeight: 600,
                        fontSize: "17px",
                        lineHeight: "22px",
                        textAlign: "center",
                        marginRight: "20px",
                        padding: "0 0 6px",
                      }}
                    >
                      Would you like to particpate?
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <Button
                        variant="contained"
                        value={no}
                        onClick={handleNo}
                        sx={{
                          border: "2px solid #cad3dd",
                          borderRadius: "7px",
                          fontWeight: 600,
                          width: "48%",
                          fontSize: "1rem",
                          color: "#C21010",
                          background: "#fafbfd",
                          textTransform: "inherit",
                          "&:hover": {
                            backgroundColor: "#C21010",
                            color: "#fafbfd",
                            border: "1px solid #C21010",
                            cursor: "pointer",
                          },
                          marginTop: "10px",
                          lineHeight: "22px",
                        }}
                      >
                        No
                      </Button>
                      <Button
                        variant="contained"
                        value={yes}
                        onClick={handleClick}
                        sx={{
                          border: "2px solid #C21010",
                          borderRadius: "7px",
                          width: "48%",
                          fontSize: "1rem",
                          color: "white",
                          background: "#C21010",
                          textTransform: "inherit",
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "white",
                            color: "#C21010",
                            border: "1px solid #0f7b9b",
                          },
                          marginTop: "10px",
                        }}
                      >
                        Yes
                      </Button>
                    </Box>{" "}
                  </Box>
                )}
              </Box>
            </Box>
          )}{" "}
        </Box>
      )}
      {activeTab === 1 && (
        <Box>
          <Participants />
        </Box>
      )}
    </>
  );
}

export default YesOrNo;
