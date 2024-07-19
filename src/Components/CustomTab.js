import React from "react";
import { Tab, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CustomTab = ({ label, value, to, tabValue }) => (
  <Tab
    label={
      <Typography
        variant="body2"
        sx={{
          fontWeight: "bold",
          color: tabValue === value ? "#000000" : "#757575",
        }}
      >
        {label}
      </Typography>
    }
    value={value}
    component={Link}
    to={to}
    sx={{
      backgroundColor: tabValue === value ? "#f0f0f0" : "transparent",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
      minWidth: "200px",
      padding: "10px 20px",
      "&:hover": {
        backgroundColor: tabValue === value ? "#f0f0f0" : "#e0e0e0",
      },
    }}
  />
);

export default CustomTab;
