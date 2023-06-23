import React, { useRef, useState } from 'react';
import { Box, Typography, Button, TextField, createTheme, ThemeProvider } from '@mui/material';
import copy from 'copy-to-clipboard';


function CopyInvitation({ firstName, rsvpDate, eventName, eventId, setInvitePage }) {
    const [copyText, setCopyText] = useState("");
    const textFieldRef = useRef(null);
    const copyToClipboard = () => {
        copy(textFieldRef.current.defaultValue);
        setCopyText(textFieldRef.current.defaultValue);
        setInvitePage(false);
    }
    const theme = createTheme({
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: '1px solid grey', 
                  },
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                  '& fieldset': {
                    borderColor: '1px solid grey', 
                  },
                },
              },
            },
          },
        },
      });

  return (
    <Box>
        <ThemeProvider theme={theme}>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={7}
          inputRef={textFieldRef}
          defaultValue={`Hello,
          ${firstName} invited you to a group gift exchange: ${eventName}. Hurry! You have until ${rsvpDate} to RSVP.
          
          Click on the link to join  
          http://localhost:3000/eventview1?eventId=${eventId}`}
          sx={{ width: '100%', border: 'none', }}
        />
        </ThemeProvider>
        <Box
         sx={{display: 'flex', justifyContent: 'center'}}
        >
            <Button 
                onClick={copyToClipboard}
                variant='outlined'
                sx={{ 
                    border: '1px solid #C21010', 
                    width: '200px',
                    borderRadius: '10px',
                    textTransform: 'inherit',
                    marginBottom: '5px',
                    color: '#C21010',
                    background: '#fff',
                    fontWeight: 'bold',
                    marginTop: '5px'
                }}
            >
                Copy
            </Button>
        </Box>
    </Box>
  )
}

export default CopyInvitation