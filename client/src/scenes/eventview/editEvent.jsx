import React from 'react';
import {
    Typography, 
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function EditEvent() {
  return <Dialog
    sx={{
        margin: '0 361px',
        display: 'flex',
    }}
  >
    <DialogContent
        sx={{
            background: '#fff',
            boxShadow: '5px 5px 25px -5px rgba(32, 32, 36, .1)',
            borderRadius: '10px',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            width: '500px',
            justifyContent: 'center',
        }}
    >
        <DialogTitle>
           <Typography>Edit event</Typography>
           <Button><DeleteIcon/>Delete</Button>
        </DialogTitle>
    </DialogContent>
  </Dialog>
}

export default EditEvent