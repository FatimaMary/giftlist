import React from 'react';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Santahat from '../assets/icons8-santas-hat-32.png';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from './FlexBetween';
import { FaChevronLeft } from 'react-icons/fa';
import { ChevronRightOutlined } from '@mui/icons-material';

const navItems = [
    {
        text: "Home",
        icon: <HomeOutlinedIcon/>
    },
    {
        text: "List",
        icon: <FormatListBulletedOutlinedIcon/>
    },
    {
        text: "GiftExchange",
        icon: <CardGiftcardOutlinedIcon/>
    },
    {
        text: "Shop",
        icon: <LocalMallOutlinedIcon/>
    },
    {
        text: "Ecards",
        icon: <LocalPostOfficeOutlinedIcon/>
    },
    {
        text: "Occations",
        icon: <PersonOutlineOutlinedIcon/>
    },
    {
        text: "My Gifts",
        icon: <EditCalendarOutlinedIcon/>
    },
    {
        text: "FAQ",
        icon: <HelpOutlineOutlinedIcon/>
    },
    {
        text: "Logout",
        icon: <LogoutOutlinedIcon/>
    }
]

const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname])
    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant='persistent'
                    anchor='left'
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            // color: 
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth
                        },
                    }}
                >
                    <Box width='100%'>
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween>
                                <Box display="flex" alignItems="center" gap='0.5rem'>
                                    <Typography variant='h4' fontWeight='bold' color='#F11299'>
                                        Giftlist
                                    </Typography>
                                </Box>
                                {!isNonMobile &&(
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <FaChevronLeft/>
                                    </IconButton>
                            )}
                            </FlexBetween>
                        </Box>
                        <List>
                        {navItems.map(({ text, icon }) => {
                            if(!icon){
                                return (
                                    <Typography key={text} 
                                    sx={{ m: "2.25rem 0 1rem 3rem"}}
                                    >
                                        {text}
                                    </Typography>
                                )
                            } 
                            const lcText = text.toLowerCase();
                            return(
                                <ListItem key={text} disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate(`/${lcText}`);
                                            setActive(lcText);
                                        }}
                                        sx={{
                                            backgroundColor: active === lcText ? '#FFEAEA' : "transparent",
                                            color:
                                                active === lcText
                                                    ? '#F11299'
                                                    : 'black'
                                        }}
                                    >
                                        <ListItemIcon
                                          sx={{
                                            ml: "2rem",
                                            color:
                                                active === lcText
                                                    ? '#F11299'
                                                    : 'black'
                                          }}
                                        >
                                            {icon}
                                        </ListItemIcon>
                                        <ListItemText primary={text}/>
                                        {/* {active === lcText && (
                                            <ChevronRightOutlined sx={{ml: "auto"}} />
                                        )} */}
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export default Sidebar;