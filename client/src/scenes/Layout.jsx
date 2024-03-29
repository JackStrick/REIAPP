import { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from '../components/General/Navbar';
import Sidebar from '../components/General/Sidebar';
import { fetchProperties } from "../features/api/dbSlice";
import LinearProgress from '@mui/material/LinearProgress';

function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const propertiesData = useSelector((state) => state.db.properties || []);

    useEffect(() => {
        // Fetch property data when the component mounts
        if (user) {
            //console.log("Dispatching fetchProperties");
            dispatch(fetchProperties());
            
        }
    }, [dispatch, user]);

    // Check if propertiesData is loading
    if (user && propertiesData.isLoading) {
        // Render loading state or loading indicator
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    }

    // Check if propertiesData is empty
    if (user && propertiesData.length === 0) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    }

    // Render your component content here when data is available
    // You can map over propertiesData and display them as needed

    //console.log('Prop Data', propertiesData);

    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
            <Sidebar
                isNonMobile={isNonMobile}
                drawerWidth={isSidebarOpen ? "250px" : "75px"}
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
    );
}

export default Layout;
