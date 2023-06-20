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

function Participants() {
   const [searchParam] = useSearchParams();
   const eventId = searchParam.get("eventId");
   const [acceptence, setAcceptence] = useState([]);
   const [participantsList, setParticipantsList] = useState([]);

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
                    
                >Participating ({trueCount})</Typography>
            </Box>
            <Box 
                sx = {{
                    display: 'flex', 
                    alignItems: 'center'
                }}
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
                    
                >Awaiting Responses (0)</Typography>
            </Box>
            <Box 
                sx = {{
                    display: 'flex', 
                    alignItems: 'center'
                }}
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
                    
                >Not Participating ({falseCount})</Typography>
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
      {participantsList.map((participant, i) => {
            if(participant.participantsAcceptence === true) {
              return (
      <Box 
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
              {...stringAvatar('Fatima')} 
              sx={{
                width: '26px',
                height: '26px',
                background: '#50bcd9',
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
            key={i}
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
              Fatima Mary
            </Typography>
            <Typography
              variant='body1'
              sx={{
                fontSize: '11px',
                lineHeight: '18px',
                color: '#818694'
              }}
            >{participant.participantsEmail}</Typography>
          </Box>
        </Box>
        <Box>
          <Button
            sx={{
              margin: '0 5px',
              background: '#50bcd9',
              fontSize: '15px',
              lineHeight: '22px',
              color: '#fff',
              padding: '14px 30px',
              display: 'inline-block',
              border: '1px solid #50bcd9',
              fontWeight: 600,
              textTransform: 'inherit',
              '&: hover' : {
                cursor: 'pointer',
                background: '#fff',
                color: '#50bcd9',
              },
              borderRadius: '7px'
            }}
          >
            View Wishes
          </Button>
          <Button
            sx={{
              padding: '14px 20px',
              fontSize: '13px',
              lineHeight: '18px',
              background: '#fafbfd',
              borderRadius: '7px',
              fontWeight: '7px',
              color: '#0f7b9b',
              display: 'inline-block',
              border: '1px solid #cad3dd',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          ><img src={Edit} />Edit RSVP</Button>
        </Box> 
      </Box>
      )} return null })}
    </Box>
  </Box>
}

export default Participants