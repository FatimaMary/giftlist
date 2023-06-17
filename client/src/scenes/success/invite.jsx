import React from 'react';
import { 
    Box, 
    Typography, 
    Button,
    Dialog,
    DialogContent,
} from '@mui/material';
import CopyInvitation from '../copyinvitation';

function Invite({ 
  open, 
  onClose, 
  invitePage, 
  setInvitePage, 
  firstName,
  eventName,
  rsvpDate,
  eventId,
}) {
    const handleClose = () => {
        onClose(invitePage);
    }
  return <Dialog
    sx={{
        margin: '0 361px',
        display: 'flex',
    }}
    onClose={handleClose}
    open={open}
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
            <CopyInvitation 
              setInvitePage={setInvitePage}
              firstName={firstName}
              eventId={eventId}
              eventName={eventName}
              rsvpDate={rsvpDate}
            />
    </DialogContent>
  </Dialog>
}

export default Invite