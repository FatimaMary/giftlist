import React from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography,
} from '@mui/material';

function Budget() {
  return <Box m='1.5rem 2.5rem'>
    <Typography variant='h4'>Gift exchange rules</Typography>
    <Box>
      <Typography>Spending limit per gift</Typography>
      <TextField /> 
    </Box>
    <Box>
      <Typography>Other details(Optional)</Typography>
      <TextField />
    </Box>
    <Box>
      <Button>
        Submit
      </Button>
    </Box>
  </Box>
}

export default Budget