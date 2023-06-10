import React, { useState } from 'react'
import { 
  Box,
  TextField,
  Typography,
  Button,
  createTheme,
  ThemeProvider
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import Star from './star.png'

function EventCreation() {
  const [eventName, setEventName] = useState();
  const [giftExchangeDate, setGiftExchangeDate] = useState();
  const [rsvpDate, setRsvpDate] = useState();
  const [confirmation, setConfirmation] = useState();
  const [searchParam] = useSearchParams();
  const userId = searchParam.get("userId")
  const navigate = useNavigate();

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#cad3dd', 
              },
            },
            '& .MuiOutlinedInput-root.Mui-focused': {
              '& fieldset': {
                borderColor: '#cad3dd', 
              },
            },
          },
        },
      },
    },
  });

  const moveToNextStep = (e) => {
    e.preventDefault();
    axios.post("http://localhost:2309/event/add", {
      eventName: eventName,
      giftExchangeDate: giftExchangeDate,
      rsvpDate: rsvpDate,
      confirmation: confirmation,
      userId: userId
    })
    .then((response) => {
      console.log("post response: ", response);
      console.log("response data: ", response.data);
      navigate(`/budget?eventId=${response.data.eventId}`);
    })
  }

  const handleClick = () => {
    navigate(`/giftexchange?userId=${userId}`)
  }

  return <Box 
      backgroundColor='#e8ecf1'
      // height='100vh'
      width='100vw'
      p='50px 30px 33px 30px'
  >
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
      }}
      onClick={handleClick}
    >
      <ArrowCircleLeftOutlinedIcon 
        sx={{
          fontSize: '1.2rem',
          color: '#0f7b9b'
        }}
      />
      <Button
        sx={{
          textTransform: 'inherit',
          color: '#0f7b9b',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >Gift exchange</Button>
    </Box>
    <Box 
      sx={{
        minHeight: '80vh',
        background: '#fff',
        border: '1px solid #e8ecf1',
        borderRadius: '10px'
      }}
    >
      <Box 
        sx={{
          maxWidth: '517px',
          margin: '0 auto',
          padding: '48px 10px 16px',
        }}
      >
        <Box 
          sx={{
            paddingBottom: '28px',
            marginBottom: '28px',
            borderBottom: '1px solid #cad3dd',
            textAlign: 'center'
          }}
        >
          <img 
            src={Star} 
            alt='star image' 
            height={100} 
            width={100}
            className='starimage'
          />
          <Typography
        variant='h4'
        sx={{
          margin:'0 0 20px',
        }}
      >
        Let's get started
      </Typography>
        </Box>
        <Box>
        <Box 
          sx={{
            marginBottom: '20px',

          }}
        >
        <Typography
          sx={{
            fontFamily: 'Poppins,sans-serif',
            fontWeight: 600,
            fontSize: '13px',
            lineHeight: '18px',
            color: '#101a34',
            // marginBottom: '5px',
            wordBreak: 'break-all',
          }}
        >
          Event Name
        </Typography>
        <ThemeProvider theme={theme}>
          <TextField 
            placeholder='Enter event name'
            sx={{
              width: '100%',
              background:'#fff',
              borderRadius: '7px',
              padding: '8px 15px',
              fontWeight: 400,
              fontSize:"1rem",
              color: '#101a34',
              lineHeight: '27px',
              '& .MuiOutlinedInput-root': {
                height: '44px',
            },
            marginLeft: '-13px'
            }}
            type='text'
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </ThemeProvider>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection:'column',
        marginBottom: '20px',
      }}>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box width='50%'>
          <Typography
            sx={{
              fontFamily: 'Poppins,sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              lineHeight: '18px',
              color: '#101a34',
              // marginBottom: '5px',
              wordBreak: 'break-all',
            }}
          >
            Gift exchange date:
          </Typography>
          <ThemeProvider theme={theme}>
          <TextField 
            type='date'
            sx={{
              width: '100%',
              background:'#fff',
              borderRadius: '7px',
              padding: '8px 15px',
              fontWeight: 400,
              fontSize:"1rem",
              color: '#101a34',
              lineHeight: '27px',
              '& .MuiOutlinedInput-root': {
                height: '44px',
            },
            marginLeft: '-13px'
            }}
            value={giftExchangeDate}
            onChange={(e) => setGiftExchangeDate(e.target.value)}
          />
          </ThemeProvider>
        </Box>
        <Box width='50%'>
          <Typography
            sx={{
              fontFamily: 'Poppins,sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              lineHeight: '18px',
              color: '#101a34',
              // marginBottom: '5px',
              wordBreak: 'break-all',
            }}
          >RSVP Date:</Typography>
          <ThemeProvider theme={theme}>
          <TextField 
            type='date' 
            sx={{
              width: '100%',
              background:'#fff',
              borderRadius: '7px',
              padding: '8px 15px',
              fontWeight: 400,
              fontSize:"1rem",
              color: '#101a34',
              lineHeight: '27px',
              '& .MuiOutlinedInput-root': {
                height: '44px',
            },
            marginLeft: '-13px'
            }} 
            value={rsvpDate}
            onChange={(e) => setRsvpDate(e.target.value)}
          />
          </ThemeProvider>
        </Box>
        </Box>
        <Box>
          <Typography 
            sx={{
              fontSize: '13px',
              lineHeight: '18px',
              color: '#5e6577',
              marginBottom: 0,
              marginTop: '6px',
            }}
          >Names will be drawn the day after the RSVP deadline</Typography>
        </Box>
      </Box>
      <Box sx={{
        width: '400px'
      }}>
        <FormControl>
          <FormLabel 
            id="demo-row-radio-buttons-group-label"
            sx={{
              fontWeight: 'bold'
            }}
          >Are you participating?</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          >
            <FormControlLabel 
              value="true" 
              control={<Radio />} 
              label="Yes" 
              sx={{
                width: '150px'
              }}
            />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <Button 
          variant='contained'
          onClick={moveToNextStep}
        >
          Next step
        </Button>
      </Box>
        </Box>
      </Box>
    </Box>
  </Box>
}

export default EventCreation