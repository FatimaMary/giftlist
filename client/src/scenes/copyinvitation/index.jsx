import React, { useRef, useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import copy from 'copy-to-clipboard';


function CopyInvitation() {
    const [copyText, setCopyText] = useState("");
    const textFieldRef = useRef(null);
    const copyToClipboard = () => {
        copy(textFieldRef.current.defaultValue);
        setCopyText(textFieldRef.current.defaultValue)
        // alert(`You have copied "${textFieldRef.current.defaultValue}"`);
    }
  return (
    <Box>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={5}
          inputRef={textFieldRef}
          defaultValue={`We're going to draw names! Make a wish list and draw a name so that everyone has time to by a gift.
          
          Click on the link to draw the name 
          http://localhost:3000/giftexchange1?groupId=${groupId}`}
        />
        <Box
         sx={{display: 'flex', justifyContent: 'center'}}
        >
            <Button 
                onClick={copyToClipboard}
                variant='outlined'
                sx={{ 
                    border: '1px solid red', 
                    // backgroundColor: 'red', 
                    width: '200px',
                    borderRadius: '25px',
                    color: 'black',
                    textTransform: 'inherit'
                }}
            >
                Copy
            </Button>
        </Box>
    </Box>
  )
}

export default CopyInvitation