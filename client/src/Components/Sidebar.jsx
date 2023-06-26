import React, { useContext } from 'react';
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
import { MyContext } from './MyContext';

// const navItems = [
//     {
//         text: "Home",
//         icon: <HomeOutlinedIcon/>
//     },
//     {
//         text: "List",
//         icon: <FormatListBulletedOutlinedIcon/>
//     },
//     {
//         text: "GiftExchange",
//         icon: <CardGiftcardOutlinedIcon/>
//     },
//     {
//         text: "Shop",
//         icon: <LocalMallOutlinedIcon/>
//     },
//     {
//         text: "Ecards",
//         icon: <LocalPostOfficeOutlinedIcon/>
//     },
//     {
//         text: "Occations",
//         icon: <PersonOutlineOutlinedIcon/>
//     },
//     {
//         text: "My Gifts",
//         icon: <EditCalendarOutlinedIcon/>
//     },
//     {
//         text: "FAQ",
//         icon: <HelpOutlineOutlinedIcon/>
//     },
//     {
//         text: "Logout",
//         icon: <LogoutOutlinedIcon/>,
//        action: handleLogout
//     }
// ]


const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(MyContext);

    const handleLogout = () => {
        console.log("Logout Clicked")
        setIsLoggedIn(false);
        navigate('/')
      };

    //   const handleAction = (lcText) => {
    //     navigate(`/${lcText}`);
    //     setActive(lcText);
    //   };
    const navItems = [
        {
            text: "Home",
            icon: <HomeOutlinedIcon/>,
            // action: handleAction
        },
        {
            text: "List",
            icon: <FormatListBulletedOutlinedIcon/>,
            // action: handleAction
        },
        {
            text: "GiftExchange",
            icon: <CardGiftcardOutlinedIcon/>,
            // action: handleAction
        },
        {
            text: "Shop",
            icon: <LocalMallOutlinedIcon/>,
            // action: handleAction
        },
        {
            text: "Ecards",
            icon: <LocalPostOfficeOutlinedIcon/>,
            // action: handleAction
        },
        {
            text: "Occations",
            icon: <PersonOutlineOutlinedIcon/>,
            // action: handleAction
        },
        {
            text: "My Gifts",
            icon: <EditCalendarOutlinedIcon/>,
            // action: handleAction
        },
        {
            text: "FAQ",
            icon: <HelpOutlineOutlinedIcon/>,
            // action: handleAction
        },
        {
            text: "Logout",
            icon: <LogoutOutlinedIcon/>,
            action: handleLogout
        }
    ]

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

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
                                    <Typography variant='h4' fontWeight='bold' color='#C21010'>
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
                        {navItems.map((item) => (
                  <ListItemButton
                    key={item.text}
                    onClick={() => {
                      item.action && item.action();
                      navigate(item.text.toLowerCase());
                    }}
                    sx={{
                        backgroundColor: active === item.text.toLowerCase() ? '#FFEAEA' : "transparent",
                        color:
                            active === item.text.toLowerCase()
                                ? '#E64848'
                                : 'black'
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                ))}
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export default Sidebar;
