import React from 'react';
import {
    Typography, 
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Box,
    InputLabel,
    createTheme,
    ThemeProvider
} from '@mui/material';
import Delete from './removeic.svg';


function EditEvent({ open, onClose, editPage }) {
    const handleClose = () => {
        onClose(editPage);
    }

    const theme = createTheme({
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: '1px solid #cad3dd', 
                  },
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                  '& fieldset': {
                    border: '1px solid #cad3dd', 
                  },
                },
              },
            },
          },
        },
      });

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
            <Button
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
                    justifyContent: 'center',
                    padding: '7px 14px',
                    borderRadius: '5px',
                    fontSize: '13px',
                    fontWeight: 600,
                    lineHeight: '18px',
                    textTransform: 'none',
                }}
            >
                <img src={Delete} style={{marginRight: '5px'}}/>
                    Delete
                </Button>
        </Box>
        <Box 
          sx={{
            maxHeight: '60vh',
            overflowY : 'auto',
            overflowX: 'hidden',
            padding: '20px 0 0',
          }}
        >
            <form>
                <Box marginBottom='20px'>
                    <InputLabel 
                        sx={{
                            fontWeight: 600,
                            fontSize: '13px',
                            lineHeight: '18px',
                            color: '#101a34',
                            // marginBottom: '5px',
                            wordBreak: 'break-all'
                        }}
                    >
                        Name
                    </InputLabel>
                    <ThemeProvider theme={theme}>
                        <TextField 
                            sx={{
                                background: '#fff',
                                borderRadius: '7px',
                                width: '100%',
                                padding: '8px 15px',
                                fontWeight: 400,
                                fontSize: '16px',
                                color: '#101a34',
                                '& .MuiOutlinedInput-root': {
                                    height: '44px',
                                },
                                marginLeft: '-15px'
                            }}
                            type='text'
                        />
                    </ThemeProvider>
                </Box>
                <Box marginBottom='20px'>
                    <Box 
                      sx={{
                        margin: '0 -4px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        width: '100%'
                      }}
                    >
                        <Box 
                            p='0 4px'
                            sx={{
                                width: '50%'
                            }}
                        >
                            <InputLabel 
                                sx={{
                                    fontWeight: 600,
                                    fontSize:'13px',
                                    lineHeight: '18px',
                                    color: '#101a34',
                                    marginBottom: '5px',
                                    wordBreak: 'break-all',
                                }}
                            >
                                Gift exchange date:
                            </InputLabel>
                            <ThemeProvider theme={theme} >
                            <TextField 
                                type='date'
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '44px',
                                    },
                                    width: '100%'
                                }}
                            />
                            </ThemeProvider>
                        </Box>
                        <Box 
                             p='0 4px'
                             sx={{
                                 width: '50%'
                             }}
                        >
                            <InputLabel 
                                sx={{
                                    fontWeight: 600,
                                    fontSize:'13px',
                                    lineHeight: '18px',
                                    color: '#101a34',
                                    marginBottom: '5px',
                                    wordBreak: 'break-all',
                                }}
                            >
                                RSVP date:
                            </InputLabel>
                            <ThemeProvider theme={theme} >
                            <TextField 
                                type='date'
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '44px',
                                    },
                                    width: '100%'
                                }}
                            />
                            </ThemeProvider>
                        </Box>
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '13px',
                                lineHeight: '20px',
                                color: '#5e6577',
                                marginBottom: 0,
                                marginTop: '6px',
                            }}
                        >Names will be drqwn the day after the RSVP deadline</Typography>
                    </Box>
                </Box>
                <Box marginBottom='20px'>
                <InputLabel 
                        sx={{
                            fontWeight: 600,
                            fontSize: '13px',
                            lineHeight: '18px',
                            color: '#101a34',
                            // marginBottom: '5px',
                            wordBreak: 'break-all'
                        }}
                    >
                        Spending limit per gift
                    </InputLabel>
                    <ThemeProvider theme={theme}>
                        <TextField 
                            sx={{
                                background: '#fff',
                                borderRadius: '7px',
                                width: '100%',
                                padding: '8px 15px',
                                fontWeight: 400,
                                fontSize: '16px',
                                color: '#101a34',
                                '& .MuiOutlinedInput-root': {
                                    height: '44px',
                                },
                                marginLeft: '-15px'
                            }}
                            type='text'
                        />
                    </ThemeProvider>
                </Box>
                <Box marginBottom='20px'>
                <InputLabel 
                        sx={{
                            fontWeight: 600,
                            fontSize: '13px',
                            lineHeight: '18px',
                            color: '#101a34',
                            // marginBottom: '5px',
                            wordBreak: 'break-all'
                        }}
                    >
                        Other details
                    </InputLabel>
                    <ThemeProvider theme={theme}>
                        <TextField 
                            sx={{
                                background: '#fff',
                                borderRadius: '7px',
                                width: '100%',
                                padding: '8px 15px',
                                fontWeight: 400,
                                fontSize: '16px',
                                color: '#101a34',
                                marginLeft: '-15px'
                            }}
                            type='text'
                            multiline
                            rows={4}
                            placeholder='Enter Your text'
                        />
                    </ThemeProvider>
                </Box>
                <Box>
                    <Button 
                        sx={{
                            background: '#50bcd9',
                            borderRadius: '7px',
                            fontSize: '15px',
                            lineHeight: '22px',
                            color: '#fff',
                            padding: '14px 30px',
                            border: '1px solid #50bcd9',
                            fontWeight: 600,
                            width: '100%',
                            textTransform: 'none',
                            '&: hover': {
                                color: '#50bcd9',
                                background: '#fff'
                            }
                        }}
                    >Save changes</Button>
                </Box>
            </form>
        </Box>
    </DialogContent>
  </Dialog>
}

export default EditEvent