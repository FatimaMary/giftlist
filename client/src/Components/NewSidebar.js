import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles"; // Step 1: Import useTheme
import { ImCross } from "react-icons/im";
import { RiMenu2Line } from "react-icons/ri";
import { useMediaQuery } from "@mui/material";
// import { useUserAuth } from "../../auth";
import { useNavigate } from "react-router-dom";
import { BiSolidDashboard, BiListUl } from "react-icons/bi";
import { BsPersonBoundingBox } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { useUserAuth } from "./MyContext";
const drawerWidth = 240;

function NewSidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isMobile = useMediaQuery("(max-width:1000px)");
  const auth = useUserAuth();
  const { logOut } = useUserAuth();
  const [selectedItem, setSelectedItem] = React.useState(
    `/dashboard?profile=${auth.user.uid}`
  );

  const navigate = useNavigate();

  const navigateTo = async (link) => {
    setMobileOpen(false); // Close the sidebar on mobile view when a menu item is clicked
    setSelectedItem(link);
    if (link === "logout") {
      // Special handling for Logout menu item
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      // For other menu items, navigate to the specified link
      navigate(link);
    }
  };

  const menuOptions = [
    {
      text: "Dashboard",
      //   icon: <BiSolidDashboard />,
      link: `/dashboard?profile=${auth.user.uid}`,
    },
    {
      text: "Events",
      icon: <BiListUl />,
      link: `/eventslist?profile=${auth.user.uid}`,
    },
    {
      text: "SantaSurprise",
      icon: <BsPersonBoundingBox />,
      link: `/santasurprise?userId=${auth.user.uid}`,
    },

    {
      text: "Logout",
      icon: <LuLogOut />,
      link: "logout",
    },
  ];
  const handleOutsideClick = (event) => {
    if (isMobileView) {
      const drawerElement = document.querySelector(".MuiDrawer-root");
      const menuIconElement = document.querySelector(
        ".MuiIconButton-edgeStart"
      );

      if (
        drawerElement &&
        !drawerElement.contains(event.target) &&
        menuIconElement &&
        !menuIconElement.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    }
  };

  // Use the useTheme hook to determine if the viewport is in mobile view
  const theme = useTheme();
  const isMobileView = theme.breakpoints.down("sm");

  const handleDrawerToggle = () => {
    console.log("Menu icon clicked");
    setMobileOpen(!mobileOpen);
    // if (isMobileView) {
    //   setMobileOpen(!mobileOpen);
    // }
  };

  React.useEffect(() => {
    // Add event listener to the document to handle clicks outside the drawer in mobile view
    document.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMobileView, mobileOpen]);

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      {!isMobile ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <h1 style={{ margin: "0 auto", marginTop: 0, color: "#bf1110" }}>
            MOI APP
          </h1>
        </Box>
      ) : (
        <></>
      )}
      <Divider style={{ borderBottom: "1px solid #e8ecf1" }} />
      <List>
        {menuOptions.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigateTo(item.link)}
              className={item.link === selectedItem ? "selected" : ""}
            >
              <ListItemIcon
                className={item.link === selectedItem ? "selected" : ""}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                className={item.link === selectedItem ? "selected" : ""}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isMobile ? (
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            zIndex: 7000,
            background: "#fff",
            color: "#101a34",
            borderBottom: "1px solid #50bcd9",
          }}
        >
          <Toolbar>
            {isMobileView ? (
              <Box
                sx={{
                  borderRight: "1px solid #cad3dd",
                  minHeight: "56px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle} // Update this line
                  sx={{
                    mr: 2,
                    display: { sm: "none" },
                  }}
                >
                  <RiMenu2Line
                    // onClick={handleMenuClicked}
                    style={{ fontSize: "25px" }}
                    //   className="Icon"
                  />
                </IconButton>
              </Box>
            ) : (
              <Box
                sx={{
                  borderRight: "1px solid #cad3dd",
                  minHeight: "56px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle} // Update this line
                  sx={{
                    mr: 2,
                    display: { sm: "none" },
                  }}
                >
                  <ImCross
                  // onClick={handleMenuClicked}
                  // className="Icon"
                  />{" "}
                </IconButton>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{ textAlign: "center" }}
              >
                MOI APP
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      ) : (
        <></>
      )}
      <Box
        // component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant={isMobileView ? "temporary" : "permanent"} // Use "temporary" for mobile view and "permanent" for other views
          open={isMobileView ? mobileOpen : true} // Keep the drawer open in non-mobile views
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            // Hide the drawer in non-mobile views
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              paddingTop: "13%",
              boxSizing: "border-box",
              width: "60%",
              background: "#fff",
              color: "#101a34",
            },
            "& .MuiTypography-root": {
              fontSize: 13,
            },
            "& .MuiListItem-root": {
              fontSize: 13,
              color: "#101a34",
              fontWeight: 500,
              lineHeight: 18,
            },
            "& .MuiSvgIcon-root": {
              fontSize: 13,
              color: "#101a34",
              fontWeight: 500,
              lineHeight: 18,
            },
            "& .MuiListItemButton-root:hover": {
              color: "#bf1110",
              background: "#feeae9",
            },
            "& .MuiSvgIcon-root:hover": {
              color: "#bf1110",
              // background: "#feeae9",
            },
            "& .MuiListItemButton-root.active": {
              color: "#bf1110",
              background: "#feeae9",
            },
            "& .MuiListItemIcon-root": {
              color: "#a8acb3",
              textAlign: "center",
              alignItems: "center",
              fontWeight: 600,
            },
            "& .MuiListItemIcon-root:hover": {
              color: "#bf1110",
              background: "#feeae9",
            },
            "& .MuiListItemButton-root.selected": {
              color: "#bf1110",
              background: "#feeae9",
            },
            "& .MuiSvgIcon-root.selected": {
              color: "#bf1110",
            },
            "& .MuiListItemButton-root:hover .MuiListItemText-primary, .MuiListItemButton-root.active .MuiListItemText-primary":
              {
                color: "#bf1110",
              },

            "& .MuiListItemButton-root:hover .MuiSvgIcon-root, .MuiListItemButton-root.active .MuiSvgIcon-root.selected":
              {
                color: "#bf1110",
              },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            // Show the drawer in non-mobile views
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#fff",
              color: "#101a34",
              fontSize: 20,
            },
            "& .MuiTypography-root": {
              fontSize: 13,
              fontWeight: 600,
            },
            "& .MuiListItem-root": {
              fontSize: 13,
              fontWeight: 600,
              color: "#101a34",
              lineHeight: 18,
            },
            "& .MuiSvgIcon-root": {
              fontSize: 13,
              color: "#101a34",
              fontWeight: 500,
              lineHeight: 18,
            },
            "& .MuiListItemButton-root": {
              alignItems: "center",
            },
            "& .MuiListItemButton-root:hover": {
              color: "#bf1110",
              background: "#f5f7fa",
            },
            "& .MuiSvgIcon-root:hover": {
              color: "#bf1110",
              // background: "#feeae9",
            },
            "& .MuiListItemButton-root.selected": {
              color: "#bf1110",
              background: "#feeae9",
            },
            "& .MuiListItemIcon-root": {
              color: "#a8acb3",
              textAlign: "center",
              alignItems: "center",
              fontWeight: 600,
            },
            "& .MuiListItemIcon-root:hover": {
              color: "#bf1110",
              // background: "#feeae9",
            },
            "& .MuiListItemButton-root.selected": {
              color: "#bf1110",
              background: "#feeae9",
            },
            "& .MuiListItemIcon-root.selected": {
              color: "#bf1110",
              // background: "#feeae9",
            },
            "& .MuiListItemButton-root:hover .MuiListItemText-primary, .MuiListItemButton-root.active .MuiListItemText-primary":
              {
                color: "#bf1110",
              },

            "& .MuiListItemButton-root:hover .MuiSvgIcon-root, .MuiListItemButton-root.active .MuiSvgIcon-root":
              {
                color: "#bf1110",
              },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

NewSidebar.propTypes = {
  window: PropTypes.func,
};

export default NewSidebar;
