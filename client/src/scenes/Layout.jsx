import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const {user} = useSelector((state) => state.auth)

    if (user){
        return (
            <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
                <Sidebar
                    isNonMobile={isNonMobile}
                    drawerWidth= {isSidebarOpen ? "250px" : "75px"}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
            <Box flexGrow={1}>
                <Navbar 
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
            </Box>
        )
    }
}

export default Layout;
