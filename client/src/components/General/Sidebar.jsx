import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from '../Misc/FlexBetween';
import Dashboard from '../../pages/Dashboard';
import { FaDollarSign, FaHome, FaUser, FaEnvelope, FaCog, FaBars, FaTimes } from 'react-icons/fa'
import { TbTargetArrow } from "react-icons/tb";
import { RiDashboardFill } from "react-icons/ri";
import { logout, reset } from '../../features/auth/authSlice'
import { Box, Drawer, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme, } from '@mui/material';
import { ChevronLeft, ChevronRightOutlined } from '@mui/icons-material';
import logoA from "../../assets/Core_logo.png"
import logoB from "../../assets/CoreIconHeaderLogoTransparent.png"

/*const navItems = [
  {
      text: "Dashboard",
      icon: <RiDashboardFill />
  },

  {
      text: "LeadFind",
      icon: <TbTargetArrow />
  },

  {
      text: "DealMe",
      icon: <FaDollarSign />
  },
  {
      text: "Properties",
      icon: <FaHome />
  },

  {
      text: "Profile",
      icon: <FaUser />
  },

  {
      text: "Messages",
      icon: <FaEnvelope />
  },

  {
      text: "Settings",
      icon: <FaCog />
  },  
]*/

const navItems = [
  {
      text: "Dashboard",
      icon: <RiDashboardFill />
  },

  {
      text: "LeadFind",
      icon: <TbTargetArrow />
  },

  {
      text: "DealMe",
      icon: <FaDollarSign />
  },
  {
      text: "Properties",
      icon: <FaHome />
  },

  {
      text: "Profile",
      icon: <FaUser />
  },
]




const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const theme = useTheme();
    const navigate = useNavigate();
    const [ isCollapsed, setIsCollapsed ] = useState(false);

    //SETS THE ACTIVE TO THE PATHNAME
    useEffect(() => {
      setActive(pathname.substring(1));
    }, [pathname])

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    }

    return (
      <Box component="nav">
        
          <Drawer
            open={true}
            onClose={() => setIsSidebarOpen(false)}
            variant='permanent'
            anchor='left'
            sx={{
              width: drawerWidth,
              "& .MuiDrawer-paper": {
                color: theme.palette.secondary[200],
                backgroundColor: theme.palette.background.alt,
                boxSixing: "border-box",
                borderWidth: isNonMobile ? 0 : "2px",
                width: drawerWidth
              }
            }}
          >
        <Box width="100%">
                    <Box m={isSidebarOpen ? "1.5rem 2rem 2rem 3rem" : "1rem 1rem 1rem 1rem"}>
                      <FlexBetween color={theme.palette.secondary.main} alignItems="center">
                        <Box display="flex" gap="0.5rem"
                          sx={{
                              "&:hover": {
                                cursor: "pointer"
                              }
                            }}
                            onClick={() => {navigate(`/`); 
                                  setActive("dashboard");
                              }}
                          >
                        {isSidebarOpen ? (
                          <Box
                              component="img"
                              alt="core-logo"
                              src={logoA}
                              height="35px"
                              width="125px"  
                          />
                          ) :
                          (
                            <Box
                                component="img"
                                alt="core-logo"
                                src={logoB}
                                height="50px"
                                width="50px"
                                marginLeft={"0px"}  
                            />
                        )}
                        </Box>
                        
                        {!isNonMobile && (
                            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                <ChevronLeft />
                            </IconButton>
                        )}
                      </FlexBetween>
                    </Box>
                    <List>
                        {navItems.map(({ text, icon }) => {
                            if (!icon) {
                                return (
                                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem"}}>
                                        {text}
                                    </Typography>
                                )
                            }
                            const lcText = text.toLowerCase();

                            return (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton
                                        onClick={() => {

                                            navigate(`/${lcText === 'dashboard' ? '' : lcText}`); 
                                            setActive(lcText);
                                    }}    
                                    sx={{
                                        backgroundColor: active === lcText 
                                            ? theme.palette.secondary[300] 
                                            : "transparent",
                                        color: 
                                            active === lcText 
                                                ? theme.palette.primary[600] 
                                                : theme.palette.secondary[100],
                                        marginLeft: isSidebarOpen ? "1rem" : "0rem",
                                        alignItems: isSidebarOpen ? 'center' : '',
                                    }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                color: 
                                                    active === lcText 
                                                        ? theme.palette.primary[600] 
                                                        : theme.palette.secondary[200],


                                            }} 
                                            
                                            
                                            
                                        >
                                            {icon}
                                        </ListItemIcon>
                                        {isSidebarOpen && 
                                            <ListItemText primary={text}>
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ ml: "auto"}} />
                                            )}
                                            </ListItemText>
                                        }
                                    
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </Drawer>
        


      </Box>
    );
        
};

export default Sidebar