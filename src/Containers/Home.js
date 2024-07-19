import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  MenuItem,
  Menu,
  Box,
  Tabs,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../Services/LoginService";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import CustomTab from "../Components/CustomTab";

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState("configurations");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1);
    if (path === "dashboard" || path === "configurations") {
      setTabValue(path);
    } else {
      setTabValue("configurations");
      navigate("/configurations");
    }
  }, [location, navigate]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    navigate(`/${newValue}`);
  };

  return (
    <div>
      <AppBar
        position="static"
        elevation={0}
        style={{
          backgroundColor: "#fff",
          color: "#000",
          marginBottom: "8px",
        }}
      >
        <Toolbar>
          <img
            src={`${process.env.PUBLIC_URL}/airtelLogo.jpg`}
            alt="Airtel"
            style={{ width: "40px", marginRight: "10px" }}
          />
          <Box display="flex" alignItems="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="30px"
              height="30px"
              borderRadius="50%"
              bgcolor="#f0f0f0"
              marginRight="10px"
            >
              <DashboardIcon fontSize="small" />
            </Box>
            <Typography
              variant="h6"
              style={{ marginBottom: 0, fontWeight: "bold" }}
            >
              IAM
            </Typography>
          </Box>
          <Box flexGrow={1} />
          <Box display="flex" alignItems="center">
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <Typography variant="body1">
              Hi <strong>Admin</strong>
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleMenu}>
              <Avatar alt="Admin" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="transparent"
          textColor="secondary"
        >
          <CustomTab
            label="Dashboard"
            value="dashboard"
            to="/dashboard"
            tabValue={tabValue}
          />
          <CustomTab
            label="Configurations"
            value="configurations"
            to="/configurations"
            tabValue={tabValue}
          />
        </Tabs>
      </Box>
      <Box bgcolor="#f0f0f0" minHeight="100vh" padding="15px" marginTop="0">
        <Outlet />
      </Box>
    </div>
  );
};

export default Home;
