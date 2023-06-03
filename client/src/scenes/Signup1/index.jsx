import React from 'react';
import { Box, Typography, TextField, FormControl as Form, Button, } from '@mui/material';


function Signup1() {
  return (
    <Box>
      <Box>
        <Box>
          <Typography>First Name</Typography>
          <TextField 
            placeholder='Enter First Name'
          />
        </Box>
        <Box>
          <Typography>Second Name</Typography>
          <TextField 
            placeholder='Enter Second Name'
          />
        </Box>
      </Box>
      <Box>
        <TextField />
        <TextField />
        <TextField />
      </Box>
      <Box>
        <Button>Submit</Button>
      </Box>
    </Box>
  )
}

export default Signup1