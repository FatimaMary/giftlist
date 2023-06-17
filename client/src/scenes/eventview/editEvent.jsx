import React from 'react';
import {
    Typography, 
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Box
} from '@mui/material';
import Delete from './removeic.svg';


function EditEvent({ open, onClose, editPage }) {
    const handleClose = () => {
        onClose(editPage);
    }

  return <Dialog
    sx={{
        margin: '0 361px',
        display: 'flex',
    }}
    open={open}
    onClose={handleClose}
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
            border: '1px solid #cad3dd',
        }}
    >
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #e8ecf1',
                flexWrap: 'wrap',
                padding: '0 0 16px',
            }}
        >
            <Typography 
                variant='h4'
                sx={{
                    fontWeight: 600,
                    fontSize:'20px',
                    lineHeight: '24px',
                    color: '#101a34',
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginBottom: 0,
                }}
            >
                Edit event
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'black',
                    background: '#fafbfd',
                    border: '1px solid #cad3dd',
                    '&: hover': {
                        background: 'red',
                        color: '#fff'
                    },
                    marginLeft: 'auto',
                    marginRight: '14px',
                }}
            >
                <img src={Delete}/>
                <Button
                    
                >
                    Delete
                </Button>
            </Box>
        </Box>
    </DialogContent>
  </Dialog>
}

export default EditEvent