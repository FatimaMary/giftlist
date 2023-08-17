import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Tick from "./tickic.svg";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import ViewWishes from "./view";

function Participants() {
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("eventId");
  const userId = searchParam.get("userId");
  const [participantsList, setParticipantsList] = useState([]);
  const [participantsData, setParticipantsData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [productDetails, setProductDetails] = useState([]);
  const [isViewWishesOpen, setIsViewWishesOpen] = useState(false);
  const [participantsId, setParticipantsId] = useState();
  const [firstName, setFirstName] = useState();
  const [secondName, setSecondName] = useState();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:2309/player/${eventId}`).then((response) => {
      console.log("Get participants response: ", response);
      console.log("Get participants response data: ", response.data);
      setParticipantsList(response.data);
      setCount(response.data.length);
      const productDetailsPromises = response.data.map((singleData) =>
        axios.get(
          `http://localhost:2309/product/all/${singleData.participantsId}`
        )
      );

      Promise.all(productDetailsPromises)
        .then((results) => {
          // results will be an array containing the resolved responses
          console.log("Product responses: ", results);
          const productDetailsValues = results.map((res) => res.data);
          console.log("Product details values: ", productDetailsValues);
          setProductDetails(productDetailsValues);
        })
        .catch((error) => {
          console.error("Error fetching product details: ", error);
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

  useEffect(() => {
    const fetchParticipantData = async () => {
      const participantDataPromises = participantsList.map(
        async (participant) => {
          const partcipantsDataResponse = await axios.get(
            `http://localhost:2309/user/${participant.participantsEmail}`
          );
          return {
            ...partcipantsDataResponse.data,
            participantsId: participant.participantsId,
          };
        }
      );

      const participantData = await Promise.all(participantDataPromises);
      console.log("Participants data 1: ", participantData);
      setParticipantsData(participantData);
      setCount(participantData.length);
    };

    fetchParticipantData();
  }, [participantsList]);

  return (
    <Box
      sx={{
        padding: "15px 0",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: isSmallScreen ? "column" : "row",
      }}
    >
      <Box sx={{ width: "272px" }}>
        <Box
          sx={{
            padding: "24px 16px",
            background: "#fff",
            border: "1px solid #e8ecf1",
            borderRadius: "10px",
            color: "#101a34",
            lineHeight: "25px",
          }}
        >
          <Box
            sx={{
              paddingBottom: "20px",
              marginBottom: "12px",
              borderBottom: "1px solid #e8ecf1",
              gap: "10px",
              display: "flex",
              flexDirection: "column",
              width: isSmallScreen ? "100%" : "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              isactive={activeTab === 0}
              onClick={() => handleTabActive(0)}
            >
              <img
                src={Tick}
                style={{
                  width: "18px",
                  height: "18px",
                  marginRight: "6px",
                }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  opacity: 0.5,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                className={`tab ${activeTab === 0 ? "click" : ""}`}
              >
                Participating ({count})
              </Typography>
            </Box>
          </Box>
          <Typography>You are participating</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flexBasis: "calc(100% - 272px)",
          maxWidth: "calc(100% - 272px)",
          padding: "0 20px",
        }}
      >
        {activeTab === 0 && (
          <>
            <Typography
              variant="h2"
              sx={{
                fontSize: "20px",
                lineHeight: "24px",
                marginBottom: "16px",
                fontWeight: 600,
                color: "#101a34",
                marginTop: isSmallScreen ? "20px" : 0,
              }}
            >
              Partcipating
            </Typography>
            {participantsData.map((participant, index) => (
              <Box
                key={index}
                sx={{
                  borderBottom: "1px solid #e8ecf1",
                  paddingBottom: "12px",
                  marginBottom: "12px",
                  display: "flex",
                  // flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: isSmallScreen
                    ? "space-between"
                    : "space-between",
                  flexDirection: "row",
                  width: isSmallScreen ? "100%" : "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    // maxWidth: isSmallScreen ? "75%" : "initial",
                  }}
                >
                  <Box>
                    <Avatar
                      {...stringAvatar(`${participant.firstName}`)}
                      sx={{
                        width: "26px",
                        height: "26px",
                        background: "#C21010",
                        fontSize: "11px",
                        marginBottom: 0,
                        lineHeight: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      paddingLeft: "8px",
                      flexBasis: "calc(100% - 26px)",
                      maxWidth: "calc(100% - 26px)",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 600,
                        fontSize: "13px",
                        lineHeight: "18px",
                        color: "#101a34",
                        marginBottom: 0,
                      }}
                    >
                      {participant.firstName}{" "}
                      {participant.secondName ? participant.secondName : ""}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "11px",
                        lineHeight: "18px",
                        color: "#818694",
                      }}
                    >
                      {participant.email}
                    </Typography>
                  </Box>
                </Box>
                <>
                  <Button
                    disabled={
                      !productDetails[index] ||
                      productDetails[index].length === 0
                    }
                    sx={{
                      margin: "0 5px",
                      background: "#C21010",
                      fontSize: isSmallScreen ? "10px" : "13px",
                      // lineHeight: "22px",
                      color: "#fff",
                      padding: isSmallScreen ? "5px 7px" : "14px 15px",
                      // display: "inline-block",
                      border: "1px solid #C21010",
                      fontWeight: 600,
                      textTransform: "inherit",
                      "&: hover": {
                        cursor: "pointer",
                        background: "#fff",
                        color: "#C21010",
                      },
                      borderRadius: "7px",
                      "&: disabled": {
                        background: "#fff",
                        color: "grey",
                        border: "1px solid grey",
                        opacity: 0.5,
                      },
                    }}
                    onClick={() => {
                      setIsViewWishesOpen(true);
                      console.log(
                        "Participants Id: ",
                        participant.participantsId
                      );
                      setParticipantsId(participant.participantsId);
                      setFirstName(participant.firstName);
                      setSecondName(participant.secondName);
                    }}
                  >
                    {isSmallScreen ? "view" : "View Wishes"}
                  </Button>
                </>
              </Box>
            ))}{" "}
          </>
        )}
        {/* {activeTab === 2 && (
          <>
            <Typography
              variant="h2"
              sx={{
                fontSize: "20px",
                lineHeight: "24px",
                marginBottom: "16px",
                fontWeight: 600,
                color: "#101a34",
              }}
            >
              Not Partcipating
            </Typography>
            {unparticipantsData.map((unparticipant, index) => (
              <Box
                key={index}
                sx={{
                  borderBottom: "1px solid #e8ecf1",
                  paddingBottom: "12px",
                  marginBottom: "12px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Box>
                    <Avatar
                      {...stringAvatar(`${unparticipant.firstName}`)}
                      sx={{
                        width: "26px",
                        height: "26px",
                        background: "#C21010",
                        fontSize: "11px",
                        marginBottom: 0,
                        lineHeight: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      paddingLeft: "8px",
                      flexBasis: "calc(100% - 26px)",
                      maxWidth: "calc(100% - 26px)",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 600,
                        fontSize: "13px",
                        lineHeight: "18px",
                        color: "#101a34",
                        marginBottom: 0,
                      }}
                    >
                      {unparticipant.firstName}{" "}
                      {unparticipant.secondName ? unparticipant.secondName : ""}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "11px",
                        lineHeight: "18px",
                        color: "#818694",
                      }}
                    >
                      {unparticipant.email}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Button
                    sx={{
                      padding: "14px 15px",
                      fontSize: "13px",
                      lineHeight: "18px",
                      background: "#fafbfd",
                      borderRadius: "7px",
                      fontWeight: "7px",
                      color: "#C21010",
                      display: "flex",
                      border: "1px solid #C21010",
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
                    Edit RSVP
                  </Button>
                </Box>
              </Box>
            ))}{" "}
          </>
        )} */}
      </Box>
      {isViewWishesOpen && (
        <ViewWishes
          open={isViewWishesOpen}
          onClose={() => setIsViewWishesOpen(false)}
          participantsId={participantsId}
          setIsViewWishesOpen={setIsViewWishesOpen}
          firstName={firstName}
          secondName={secondName}
        />
      )}
    </Box>
  );
}

export default Participants;
