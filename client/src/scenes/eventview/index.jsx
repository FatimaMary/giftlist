import React, { useEffect, useState } from 'react';
import { 
    Box,
    Typography,
    Button,
 } from '@mui/material';
 import Santa from '../giftExchange/santa1.png';
 import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

function EventView() {
    const [searchParam] = useSearchParams();
    const eventId = searchParam.get("eventId");
    useEffect(() => {
      axios.get(`http://`)
    }, [])
    
    function stringAvatar(name) {
        return {
          children: `${name.split(' ')[0][0]}`,
        };
      }
  return <Box 
    backgroundColor='#e8ecf1'
    width='100vw'
    p='50px 30px 33px 30px'
    >
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
            }}
        >
            <Box>
                <img 
                    src={Santa} 
                    alt='santa image' 
                    height={200} 
                    width={250}
                    className='starimage'
                />
            </Box>
            <Box sx={{
                width: '100%',
                margin: '15px',
            }}>
                <Box 
                  sx = {{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '15px'
                  }}
                >
                    <Typography
                        variant='h2'
                        sx={{
                            fontSize: '28px',
                            lineHeight: '34px',
                            marginBottom: 0,
                            maxWidth: '73%',
                            fontWeight: 600,
                            color: '#101a34',
                        }}
                    >
                        Event name
                    </Typography>
                    <Box 
                       sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-end'
                       }}
                    >
                        <Button
                            sx={{
                                marginRight: '12px',
                                padding: '8px 15px',
                                fontWeight: 600,
                                fontSize: '13px',
                                lineHeight: '18px',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                background: '#50bcd9',
                                color: '#fff',
                                border: '1px solid #50bcd9',
                                textTransform: 'inherit'
                            }}
                        >
                            <ShareOutlinedIcon 
                                sx={{
                                    width: '16px', 
                                    height: '16px',
                                    marginRight: '5px'
                                }}
                            />
                            Invite
                        </Button>
                        <Button
                             sx={{
                                marginRight: '12px',
                                padding: '8px 15px',
                                fontWeight: 600,
                                fontSize: '13px',
                                lineHeight: '18px',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                background: '#fafbfd',
                                color: '#101a34',
                                border: '1px solid #cad3dd',
                                textTransform: 'inherit'
                            }}
                        >
                            <EditCalendarOutlinedIcon 
                                 sx={{
                                    width: '16px', 
                                    height: '16px', 
                                    marginRight: '5px'
                                }}
                            />
                            Edit
                        </Button>
                    </Box>
                </Box>
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'felx-start',
                        alignItems: 'center',
                        marginBottom: '22px',
                        // gap: '25px',

                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '13px',
                            lineHeight: '16px',
                            color: '#5e6577',
                            paddingRight: '15px',
                            marginRight: '15px',
                            borderRight: '1px solid #cad3dd',
                        }}
                    >
                        Exchange gifts by: <span style={{fontWeight: 600, color: '#101a34'}}>Date</span>
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '13px',
                            lineHeight: '16px',
                            color: '#5e6577',
                            paddingRight: '15px',
                            marginRight: '15px',
                            borderRight: '1px solid #cad3dd',
                        }}
                    >
                        RSVP by: <span style={{fontWeight: 600, color: '#101a34'}}>Date</span>
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '13px',
                            lineHeight: '16px',
                            color: '#5e6577',
                            paddingRight: '15px',
                            marginRight: '15px',
                            // borderRight: '1px solid #cad3dd',
                        }}
                    >
                        Gift budget: <span style={{fontWeight: 600, color: '#101a34'}}>Amount</span> 
                    </Typography>
                </Box>
                <Box 
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginBottom: '10px',
                    width: '100%',
                  }}
                >
                    <Avatar 
                        {...stringAvatar('Organizer name')} 
                        sx={{
                            width: '40px',
                            height: '40px',
                            background: '#50bcd9',
                            fontSize: '13px',
                        }}
                    />
                    <Box 
                      sx={{
                        flexBasis: 'calc(100% - 48px)',
                        maxWidth: 'calc(100% - 48px)',
                        paddingLeft: '12px'
                      }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontSize: '13px',
                                lineHeight: '16px',
                                color: '#818694',
                                marginBottom: 0,
                            }}
                        >
                            Organizer
                        </Typography>
                        <Typography
                            variant='h4'
                            sx={{
                                fontWeight: 600,
                                fontSize: '17px',
                                lineHeight: '22px',
                                color: '#101a34',
                                marginBottom: 0,
                            }}
                        >
                            Organizer name
                        </Typography>
                    </Box>
                </Box>
                <Box 
                  sx={{
                    fontSize: '15px',
                    lineHeight: '140%',
                    color: '#5e6577',
                    paddingBottom: '17px',
                    borderBottom: '1px solid #cad3dd',
                  }}
                >
                    <Typography
                        sx={{
                            height:'20px',
                            overflow: 'hidden',
                            maxWidth: '500px',
                            wordBreak: 'break-word',
                            margin: '0px'
                        }}
                    >Join our son's birthday celebration</Typography>
                </Box>
            </Box>
        </Box>
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
            <Typography
                sx={{
                    color: '#101a34',
                    fontWeight: 600,
                    fontSize: '17px',
                    lineHeight: '22px',
                    textAlign: 'center',
                    marginRight: '20px',
                    padding: '0 0 6px',
                    '&:hover': {
                        cursor: 'pointer'
                    },
                    borderBottom: '3px solid #50bcd9'
                }}
            >
                Home
            </Typography>
            <Typography
                sx={{
                    color: '#101a34',
                    fontWeight: 600,
                    fontSize: '17px',
                    lineHeight: '22px',
                    textAlign: 'center',
                    marginRight: '20px',
                    padding: '0 0 6px',
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}
            >
                Participants
            </Typography>
            <Typography
                sx={{
                    color: '#101a34',
                    fontWeight: 600,
                    fontSize: '17px',
                    lineHeight: '22px',
                    textAlign: 'center',
                    marginRight: '20px',
                    padding: '0 0 6px',
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}
            >
                Messages
            </Typography>
            <Typography
                sx={{
                    color: '#101a34',
                    fontWeight: 600,
                    fontSize: '17px',
                    lineHeight: '22px',
                    textAlign: 'center',
                    marginRight: '20px',
                    padding: '0 0 6px',
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}
            >
                My Wishes
            </Typography>
        </Box>
        <Box 
          sx={{
            padding: '15px 0',
            display: 'flex',
            width: '100%'
          }}
        >
            <Box
              sx={{
                width: '50%',
                padding: '24px 16px',
                background: '#fff',
                border: '1px solid #e8ecf1',
                borderRadius: '10px',

              }}
            >
                <Typography
                    variant='h3'
                    sx={{
                        fontSize: '20px',
                        lineHeight: '25px',
                        paddingBottom: '16px',
                        marginBottom: '16px',
                        borderBottom: '1px solid #e8ecf1'
                    }}
                >
                    Your gift exchange checklist
                </Typography>
            </Box>
            <Box></Box>
        </Box>
    </Box>
}

export default EventView