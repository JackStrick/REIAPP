import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import {BrowserRouter, BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/General/Header";
import Layout from "./scenes/Layout";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Leadfind from "./pages/Leadfind";
import Dealme from "./pages/Dealme";
import Properties from "./pages/Properties";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SingleProperty from "./pages/SingleProperty";


function App() {
  const mode = useSelector((state) => state.mode.mode);
  const {user} = useSelector((state) => state.auth);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
    <Router>
      <div className='container'>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            { !user  && <Header /> }
            
            <Routes>
                <Route element={ user && <Layout />}>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/leadfind' element={<Leadfind />} />
                  <Route path='/dealme' element={<Dealme />} />
                  <Route path='/properties' element={<Properties />} />
                  <Route path='/properties/:propertyId' element={<SingleProperty />} />
                  <Route path='/profile' element={<Profile />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
          </ThemeProvider>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
