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
import Star from './star.png';
import CopyrightIcon from '@mui/icons-material/Copyright';

function EventCreation() {
  const [eventName, setEventName] = useState();
  const [giftExchangeDate, setGiftExchangeDate] = useState();
  const [rsvpDate, setRsvpDate] = useState();
  const [confirmation, setConfirmation] = useState();
  const [errors, setErrors] = useState({});
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
    const validationErrors = {};
        if (!eventName) {
        validationErrors.eventName = 'Event Name is required';
        }
        if (!giftExchangeDate) {
        validationErrors.giftExchangeDate = 'Gift Exchange Date is required';
        } 
        if (!rsvpDate) {
          validationErrors.rsvpDate = 'RSVP Date Required'
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
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
            navigate(`/budget?eventId=${response.data.eventId}&userId=${userId}`);
          })
      }
  }

  const handleClick = () => {
    navigate(`/giftexchange?userId=${userId}`)
  }

  return <Box 
      backgroundColor='#e8ecf1'
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
            error={!!errors.eventName}
             helperText={errors.eventName}
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
            error={!!errors.giftExchangeDate}
             helperText={errors.giftExchangeDate}
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
            error={!!errors.rsvpDate}
            helperText={errors.rsvpDate}
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
        width: '600px',
        marginBottom: '20px'
      }}>
        <FormControl>
          <FormLabel 
            id="demo-row-radio-buttons-group-label"
            sx={{
              fontWeight: 600,
              fontSize:'13px',
              lineHeight: '18px',
              color: '#101a34',
              marginBottom:'5px',
              wordBreak: 'break-all'
            }}
          >Are you participating?</FormLabel>
          <RadioGroup
            sx={{
              display: 'flex',
              width: '100%',
              gap: '10px',
              marginLeft: '10px'
            }}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          >
            <FormControlLabel 
              value="true" 
              control={<Radio 
                sx={{ alignSelf: 'center' }} 
                className="custom-radio"
                />} 
              label="Yes" 
              sx={{
                width: '225px',
                border: '1px solid #cad3dd',
                borderRadius: '7px',
                fontSize: '0.8rem',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
            <FormControlLabel 
              value="false" 
              control={<Radio 
                sx={{ alignSelf: 'center' }} 
                className="custom-radio"
                />} 
              label="No" 
              sx={{
                width: '225px',
                border: '1px solid #cad3dd',
                borderRadius: '7px',
                textAlign: 'center',
                fontSize: '0.8rem',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <Button 
          onClick={moveToNextStep}
          variant='contained'
          sx={{ 
            border: '2px solid skyblue',
            borderRadius: '10px',
            width: '100%',
            fontSize: '1rem',
            color: 'white',
            background: 'skyblue',
            textTransform: 'inherit',
            fontWeight:'bold',
            '&:hover': {
              backgroundColor: '#D8D8D8',
              color: 'black',
              border: '1px solid skyblue'
            },
            marginTop: '10px'
          }}
        >
          Next step
        </Button>
      </Box>
        </Box>
      </Box>
    </Box>
    <Box sx={{
      display: 'flex',
      justifyContent:'space-between',
      borderTop: '1px solid grey',
      marginTop: '20px',
    }}>
      <Box sx={{
        display: 'flex',
        paddingTop: '10px',
      }}
      >
        <CopyrightIcon 
          sx={{
            fontSize: '16px'
          }} 
        />
        <Typography sx={{
            fontSize: '13px'
          }} 
        >
          GiftList. All Rights Reserved
        </Typography>
      </Box>
      <Box>
        <Button 
          sx={{
            textTransform: 'inherit',
            color:'black',
            '&:hover': {
              cursor: 'pointer',
              color: 'skyblue',
              background: 'transparent'
            },
          }}
        >
          Privacy policy
        </Button>
        <Button
          sx={{
            textTransform: 'inherit',
            color:'black',
            '&:hover': {
              cursor: 'pointer',
              color: 'skyblue',
              background: 'transparent'
            },
          }}
        >
          Terms of use
        </Button>
        <Button
          sx={{
            textTransform: 'inherit',
            color:'black',
            '&:hover': {
              cursor: 'pointer',
              color: 'skyblue',
              background: 'transparent'
            },
          }}
        >
          Desclaimer
        </Button>
        <Button 
          sx={{
            textTransform: 'inherit',
            color:'black',
            '&:hover': {
              cursor: 'pointer',
              color: 'skyblue',
              background: 'transparent'
            },
          }}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
  </Box>
}

export default EventCreation