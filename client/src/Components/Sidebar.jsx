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

export const Sidebar = [
    {
      title: "Home",
      path: "/",
      icon: <HomeOutlinedIcon />,
      cName: "nav-text",
    },
    {
      title: "Lists",
      path: "/Lists",
      icon: <FormatListBulletedOutlinedIcon />,
      cName: "nav-text",
    },
    {
      title: "Gift Exchange",
      path: "/giftexchange",
      icon: <Santahat />,
      cName: "nav-text",
    },
    {
      title: "Shop",
      path: "/shop",
      icon: <LocalMallOutlinedIcon />,
      cName: "nav-text",
    },
    {
      title: "Ecards",
      path: "/ecards",
      icon: <LocalPostOfficeOutlinedIcon />,
      cName: "nav-text",
    },
    {
      title: "My Gifts",
      path: "/mygifts",
      icon: <CardGiftcardOutlinedIcon />,
      cName: "nav-text",
    },
  ];