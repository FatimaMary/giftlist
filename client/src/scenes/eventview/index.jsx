import React, { useEffect, useState } from 'react';
import { 
    Box,
    Typography,
    Button,
 } from '@mui/material';
import Santa from '../giftExchange/santa1.png';
import Avatar from '@mui/material/Avatar';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Mail from './mail12.svg';
import Edit from './editicblue.svg';
import Gift from './gift12.svg';
import Santa1 from './santa12.svg';
import Footer from '../../Components/Footer';
import Participants from '../participants';
import Invite from '../success/invite';

function EventView() {
    const [eventDetails, setEventDetails] = useState([]);
    const [name, setName] = useState([]);
    const [invitePage, setInvitePage] = useState(false);
    const [searchParam] = useSearchParams();
    const eventId = searchParam.get("eventId");
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
      axios.get(`http://localhost:2309/event/get/${eventId}`)
        .then((response) => {
            console.log("Get response: ", response);
            console.log("Get response data: ", response.data);
            setEventDetails(response.data);
        });
        axios.get(`http://localhost:2309/event/user/${eventId}`)
            .then((response) => {
                console.log("User Name get response: ", response);
                console.log("user name get response data: ", response.data);
                setName(response.data);
            })
    }, [])
    
    function stringAvatar(name) {
        return {
          children: `${name.split(' ')[0][0]}`,
        };
      }

      const handleTabActive = (index) => {
        setActiveTab(index);
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
                        {eventDetails.eventName}
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
                            onClick={() => setInvitePage(true)}
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
                        Exchange gifts by: <span style={{fontWeight: 600, color: '#101a34'}}>{eventDetails.giftExchangeDate}</span>
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
                        RSVP by: <span style={{fontWeight: 600, color: '#101a34'}}>{eventDetails.rsvpDate}</span>
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
                        Gift budget: <span style={{fontWeight: 600, color: '#101a34'}}>{eventDetails.budget}</span> 
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
                        {...stringAvatar(`${name.firstName}`)} 
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
                            {name.firstName} {name.secondName}
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
                    >{eventDetails.details}</Typography>
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
                isActive={activeTab === 0}
                className={`tab ${activeTab === 0 ? 'active' : ''}`}
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
                }}
                onClick = {() => handleTabActive(0)}
            >
                Home
            </Typography>
            <Typography
                isActive = {activeTab === 1}
                className={`tab ${activeTab === 1 ? 'active' : ''}`}
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
                    '&.active' : {
                        borderBottom: '3px solid skyblue'
                    }
                }}
                onClick={() => handleTabActive(1)}
            >
                Participants
            </Typography>
            <Typography
                isActive={activeTab === 2}
                className={`tab ${activeTab === 2 ? 'active' : ''}`}
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
                onClick={() => handleTabActive(2)}
            >
                Messages
            </Typography>
            <Typography
                isActive = {activeTab === 3}
                className={`tab ${activeTab === 3 ? 'active' : ''}`}
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
                onClick = {() => handleTabActive(3)}
            >
                My Wishes
            </Typography>
        </Box>
        {activeTab === 0 &&
        <Box 
          sx={{
            padding: '15px 0',
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
            <Box
              sx={{
                width: '48%',
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
                <Box 
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    justifyContent: 'center'
                  }}
                >
                    <Typography 
                        sx={{
                            display: 'flex',
                            gap: '5px',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            marginBottom: '10px',
                        }}
                    >
                        <CheckCircleOutlineIcon 
                            sx={{
                                color: 'green',
                                width: '18px',
                                height: '18px',
                            }}
                        />
                        Invite at least 3 participants
                    </Typography>
                    <Typography
                        sx={{
                            display: 'flex',
                            gap: '5px',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            marginBottom: '10px',
                        }}
                    >
                        <CheckCircleOutlineIcon
                            sx={{
                                color: 'green',
                                width: '18px',
                                height: '18px',
                            }}
                        />
                        RSVP by {eventDetails.rsvpDate}
                    </Typography>
                    <Typography
                        sx={{
                            display: 'flex',
                            gap: '5px',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            marginBottom: '10px',
                        }}
                    >
                        <CancelOutlinedIcon
                            sx={{
                                color: 'red',
                                width: '18px',
                                height: '18px',
                            }}
                        /> 
                        Add to your wish list
                    </Typography>
                    <Typography
                        sx={{
                            display: 'flex',
                            gap: '5px',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            marginBottom: '10px',
                        }}
                    >
                        <CancelOutlinedIcon 
                            sx={{
                                color: 'red',
                                width: '18px',
                                height: '18px',
                            }}
                        /> 
                        Update your gift delivery perference
                    </Typography>
                </Box>
            </Box>
            <Box
              sx={{
                width: '50%',
                padding: '24px 16px',
                background: '#fff',
                border: '1px solid #e8ecf1',
                borderRadius: '10px',
              }}
            >
                <Box 
                  sx={{
                    paddingBottom: '16px',
                    marginBottom: '16px',
                    borderBottom: '1px solid #e8ecf1',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                    <Box 
                      sx={{
                        flexBasis: 'calc(100% - 134px)',
                        maxWidth: 'calc(100% - 134px)',
                        fontSize: '13px',
                        lineHeight:'18px',
                        color: '#5e6577',
                        display: 'flex',
                        // gap: '5px'
                      }}
                    >
                        <img src={Mail} style={{paddingRight: '10px'}}/>
                        <Box>
                            <Typography 
                                sx={{
                                    // marginBottom: '2px',
                                    fontWeight: 600,
                                    fontSize: '13px',
                                    color: '#101a34',
                                    wordBreak: 'break-all',
                                }}
                            >
                                RSVP Status:
                            </Typography>
                            <Typography 
                                sx={{
                                    marginBottom: 0,
                                    fontSize: '13px',
                                }}
                            >
                                Participating
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                       sx={{
                        flexBasis: '125px',
                        maxWidth: '125px',
                       }}
                    >
                        <Button
                            sx={{
                                marginBottom: 0,
                                color: '#0f7b9b',
                                background: '#fafbfd',
                                border: '1px solid #cad3dd',
                                padding: '8px 12px',
                                fontWeight: 600,
                                fontSize: '12px',
                                lineHeight: '18px',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 'auto',
                                whiteSpace: 'nowrap',
                                '&:hover': {
                                    cursor: 'pointer'
                                },
                                textTransform: 'inherit'
                            }}
                        >
                            <img 
                                src={Edit} 
                                style={{ 
                                    width: '17px', 
                                    height: '17px', 
                                    marginRight: '5px'
                                }}
                            />
                            Edit RSVP
                        </Button>
                    </Box>
                </Box>
                <Box 
                    sx={{
                        paddingBottom: '16px',
                        marginBottom: '16px',
                        borderBottom: '1px solid #e8ecf1',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box 
                        sx={{
                            flexBasis: 'calc(100% - 134px)',
                            maxWidth: 'calc(100% - 134px)',
                            fontSize: '13px',
                            lineHeight:'18px',
                            color: '#5e6577',
                            display: 'flex',
                          }}
                    >
                        <img 
                            src={Gift} 
                            style={{
                                paddingRight: '10px'
                            }}
                            />
                        <Box>
                            <Typography 
                                sx={{
                                    marginBottom: '2px',
                                    fontWeight: 600,
                                    fontSize: '13px',
                                    lineHeight: '18px',
                                    color: '#101a34',
                                    wordBreak: 'break-all',
                                }}
                            >You're giving to:</Typography>
                            <Typography
                                sx={{
                                    marginBottom: 0,
                                    fontSize: '13px',
                                }}
                            >Check back after the draw date on {eventDetails.rsvpDate}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        paddingBottom: '16px',
                        marginBottom: '16px',
                        // borderBottom: '1px solid #e8ecf1',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box 
                        sx={{
                            flexBasis: 'calc(100% - 134px)',
                            maxWidth: 'calc(100% - 134px)',
                            fontSize: '13px',
                            lineHeight:'18px',
                            color: '#5e6577',
                            display: 'flex',
                          }}
                    >
                        <img src={Santa1} style={{ paddingRight: '10px' }}/>
                        <Box>
                        <Typography 
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '13px',
                                    color: '#101a34',
                                    wordBreak: 'break-all',
                                }}
                            >
                                Your gift giver:
                            </Typography>
                            <Typography 
                                sx={{
                                    marginBottom: 0,
                                    fontSize: '13px',
                                }}
                            >
                                Your gift giver will be revealed after the gift exchange date set by the event organizer on {eventDetails.giftExchangeDate}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                       sx={{
                        flexBasis: '125px',
                        maxWidth: '125px',
                       }}
                    >
                        <Button
                            sx={{
                                marginBottom: 0,
                                color: '#0f7b9b',
                                background: '#fafbfd',
                                border: '1px solid #cad3dd',
                                padding: '8px 12px',
                                fontWeight: 600,
                                fontSize: '12px',
                                lineHeight: '18px',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 'auto',
                                whiteSpace: 'nowrap',
                                '&:hover': {
                                    cursor: 'pointer'
                                },
                                textTransform: 'inherit'
                            }}
                        >
                            <img 
                                src={Edit} 
                                style={{ 
                                    width: '17px', 
                                    height: '17px', 
                                    marginRight: '5px'
                                }}
                            />
                            Gift Delivery
                        </Button>
                    </Box>
                </Box>
            </Box> </Box> }
        { activeTab === 1 && <Box><Participants/></Box>}
        { activeTab === 2 && <Box>Messages</Box>}
        { activeTab === 3 && <Box>My Wishes</Box>}
        <Footer />
        <Invite 
            open={invitePage}
            onClose={() => setInvitePage(false)}
            setInvitePage={setInvitePage}
        />
    </Box>
}

export default EventView