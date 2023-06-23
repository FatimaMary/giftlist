import React, { useEffect, useState } from 'react';
import { 
    Box, 
    Typography, 
    Button,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Tick from './tickic.svg';
import Clock from './clockic.svg';
import Cross from './crossic2.svg';
import Edit from '../eventview/editicblue.svg'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function Participants() {
   const [searchParam] = useSearchParams();
   const eventId = searchParam.get("eventId");
   const [acceptence, setAcceptence] = useState([]);
   const [participantsList, setParticipantsList] = useState([]);
   const [participantsData, setParticipantsData] = useState([]);
   const [unparticipantsData, setUnparticipantsData] = useState([]);
   const [activeTab, setActiveTab] = useState(0);

   useEffect(() => {
    axios.get(`http://localhost:2309/player/${eventId}`)
      .then((response) => {
          console.log("Get participants response: ", response);
          console.log("Get participants response data: ", response.data);
          setParticipantsList(response.data);
          const acceptenceValues = response.data.map((item) => item.participantsAcceptence);
          setAcceptence(acceptenceValues);
          console.log("acceptence: ", acceptenceValues);
         
      });
  }, []);
  const trueCount = acceptence.filter(value => value === true).length;
  const falseCount = acceptence.filter(value => value === false).length;

    function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}`,
    };
  }
  const handleTabActive = (index) => {
    setActiveTab(index);
  }

  useEffect(() => {
    const fetchParticipantData = async () => {
      const participantDataPromises = participantsList
        .filter((participant) => participant.participantsAcceptence === true)
        .map(async (participant) => {
          const partcipantsDataResponse = await axios.get(`http://localhost:2309/user/${participant.participantsEmail}`);
          return partcipantsDataResponse.data;
        });
  
      const participantData = await Promise.all(participantDataPromises);
      setParticipantsData(participantData);
    };
  
    fetchParticipantData();
  }, [participantsList]);

  useEffect(() => {
    const fetchUnParticipantsData = async() => {
      const unparticipantDataPromises = participantsList
        .filter((unparticipant) => unparticipant.participantsAcceptence === false)
        .map(async (unparticipant) => {
          const unparticipantDataResponse = await axios.get(`http://localhost:2309/user/${unparticipant.participantsEmail}`);
          return unparticipantDataResponse.data;
        });
        const unparticipantData = await Promise.all(unparticipantDataPromises);
        setUnparticipantsData(unparticipantData);
    };
    fetchUnParticipantsData();
  }, [participantsList]);
  
  return <Box sx={{
    padding: '15px 0',
    display: 'flex',
    flexWrap: 'wrap',
  }}>
    <Box sx={{width: '272px'}}>
        <Box
          sx={{
            padding: '24px 16px',
            background: '#fff',
            border: '1px solid #e8ecf1',
            borderRadius: '10px',
            color: '#101a34',
            lineHeight: '25px',
          }}
        >
          <Box 
            sx={{
              paddingBottom: '20px',
              marginBottom: '12px',
              borderBottom: '1px solid #e8ecf1',
              gap: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box 
                sx = {{
                    display: 'flex', 
                    alignItems: 'center'
                }}
                isactive = {activeTab === 0}
                onClick={() => handleTabActive(0)}
            >
                <img 
                    src={Tick} 
                    style={{
                        width: '18px', 
                        height: '18px', 
                        marginRight: '6px'
                    }} 
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    opacity: 0.5,
                    '&:hover': {
                      cursor: 'pointer'
                    },
                  }}
                  className = {`tab ${activeTab === 0 ? 'click' : ''}`}
                >
                  Participating ({trueCount})
                </Typography>
            </Box>
            {/* <Box 
                sx = {{
                    display: 'flex', 
                    alignItems: 'center'
                }}
                isactive = {activeTab === 1}
                className = {`tab ${activeTab === 1 ? 'click' : ''}`}
                onClick={() => handleTabActive(1)}
            >
                <img 
                    src={Clock} 
                    style={{
                        width: '18px', 
                        height: '18px', 
                        marginRight: '6px'
                    }} 
                />
                <Typography 
                  sx={{
                    fontWeight: 600,
                    opacity: 0.5,
                    '&:hover': {
                      cursor: 'pointer'
                    }
                  }}
                >
                  Awaiting Responses (0)
                </Typography>
            </Box> */}
            <Box 
                sx = {{
                    display: 'flex', 
                    alignItems: 'center'
                }}
                isactive = {activeTab === 2}
                
                onClick={() => handleTabActive(2)}
            >
                <img 
                    src={Cross} 
                    style={{
                        width: '18px', 
                        height: '18px', 
                        marginRight: '6px'
                    }} 
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    opacity: 0.5,
                    '&:hover': {
                      cursor: 'pointer'
                    }
                  }}
                  className = {`tab ${activeTab === 2 ? 'click' : ''}`}
                >
                  Not Participating ({falseCount})
                </Typography>
            </Box>
            </Box>
            <Typography>You are participating</Typography>
        </Box>
    </Box>
    <Box 
      sx={{
        flexBasis: 'calc(100% - 272px)',
        maxWidth: 'calc(100% - 272px)',
        padding: '0 20px',
      }}
    >
      {activeTab === 0 && <>
      <Typography 
        variant='h2'
        sx={{
          fontSize: '20px',
          lineHeight: '24px',
          marginBottom: '16px',
          fontWeight: 600,
          color: '#101a34',
        }}
      >
        Partcipating
      </Typography>
       {participantsData.map((participant, index) => (
      <Box 
        key={index}
        sx={{
          borderBottom: '1px solid #e8ecf1',
          paddingBottom: '12px',
          marginBottom: '12px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex'
          }}
        >
          <Box>
            <Avatar 
              {...stringAvatar(`${participant.firstName}`)} 
              sx={{
                width: '26px',
                height: '26px',
                background: '#C21010',
                fontSize: '11px',
                marginBottom: 0,
                lineHeight: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
               }}
            />
          </Box>
          <Box
            sx={{
              paddingLeft: '8px',
              flexBasis: 'calc(100% - 26px)',
              maxWidth: 'calc(100% - 26px)',
            }}
          >
            <Typography 
              variant='h4'
              sx={{
                fontWeight: 600,
                fontSize: '13px',
                lineHeight: '18px',
                color: '#101a34',
                marginBottom: 0
              }}
            >
             {participant.firstName + ' ' + participant.secondName}
            </Typography>
            <Typography
              variant='body1'
              sx={{
                fontSize: '11px',
                lineHeight: '18px',
                color: '#818694'
              }}
            >{participant.email}</Typography>
          </Box>
        </Box>
        <Box>
          <Button
            sx={{
              margin: '0 5px',
              background: '#C21010',
              fontSize: '13px',
              lineHeight: '22px',
              color: '#fff',
              padding: '14px 15px',
              display: 'inline-block',
              border: '1px solid #C21010',
              fontWeight: 600,
              textTransform: 'inherit',
              '&: hover' : {
                cursor: 'pointer',
                background: '#fff',
                color: '#C21010',
              },
              borderRadius: '7px'
            }}
          >
            View Wishes
          </Button>
          <Button
            sx={{
              padding: '14px 15px',
              fontSize: '13px',
              lineHeight: '18px',
              background: '#fafbfd',
              borderRadius: '7px',
              fontWeight: '7px',
              color: '#C21010',
              display: 'inline-block',
              border: '1px solid #C21010',
              '&:hover': {
                cursor: 'pointer',
              },
              textTransform: 'inherit'
            }}
          ><img src={Edit}
            style={{ 
              width: '17px', 
              height: '17px', 
              marginRight: '5px',
              filter: 'hue-rotate(180deg)',
            }}
          />Edit RSVP</Button>
        </Box> 
      </Box> 
      ))} </>}
      {activeTab === 2 && <>
      <Typography 
        variant='h2'
        sx={{
          fontSize: '20px',
          lineHeight: '24px',
          marginBottom: '16px',
          fontWeight: 600,
          color: '#101a34',
        }}
      >
        Not Partcipating
      </Typography>
       {unparticipantsData.map((unparticipant, index) => (
      <Box 
        key={index}
        sx={{
          borderBottom: '1px solid #e8ecf1',
          paddingBottom: '12px',
          marginBottom: '12px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex'
          }}
        >
          <Box>
            <Avatar 
              {...stringAvatar(`${unparticipant.firstName}`)} 
              sx={{
                width: '26px',
                height: '26px',
                background: '#C21010',
                fontSize: '11px',
                marginBottom: 0,
                lineHeight: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
               }}
            />
          </Box>
          <Box
            sx={{
              paddingLeft: '8px',
              flexBasis: 'calc(100% - 26px)',
              maxWidth: 'calc(100% - 26px)',
            }}
          >
            <Typography 
              variant='h4'
              sx={{
                fontWeight: 600,
                fontSize: '13px',
                lineHeight: '18px',
                color: '#101a34',
                marginBottom: 0
              }}
            >
             {unparticipant.firstName + ' ' + unparticipant.secondName}
            </Typography>
            <Typography
              variant='body1'
              sx={{
                fontSize: '11px',
                lineHeight: '18px',
                color: '#818694'
              }}
            >{unparticipant.email}</Typography>
          </Box>
        </Box>
        <Box>
          {/* <Button
            sx={{
              margin: '0 5px',
              background: '#C21010',
              fontSize: '15px',
              lineHeight: '22px',
              color: '#fff',
              padding: '14px 30px',
              display: 'inline-block',
              border: '1px solid #C21010',
              fontWeight: 600,
              textTransform: 'inherit',
              '&: hover' : {
                cursor: 'pointer',
                background: '#fff',
                color: '#C21010',
              },
              borderRadius: '7px'
            }}
          >
            View Wishes
          </Button> */}
          <Button
            sx={{
              padding: '14px 20px',
              fontSize: '13px',
              lineHeight: '18px',
              background: '#fafbfd',
              borderRadius: '7px',
              fontWeight: '7px',
              color: '#9A208C',
              display: 'inline-block',
              border: '1px solid #cad3dd',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          ><img src={Edit}
            style={{ 
              width: '17px', 
              height: '17px', 
              marginRight: '5px',
              filter: 'hue-rotate(120deg)',
            }}
          />Edit RSVP</Button>
        </Box> 
      </Box> 
      ))} </>}
    </Box>
  </Box>
}

export default Participants