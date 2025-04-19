import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon, AccountCircle, Search } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminTopbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1E1E2D" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#333", borderRadius: "5px", padding: "2px 10px", mr: 2 }}>
          <Search sx={{ color: "#fff" }} />
          <InputBase placeholder="Search..." sx={{ ml: 1, color: "#fff" }} />
        </Box>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircle />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={()=> {navigate("/")}}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AdminTopbar;
