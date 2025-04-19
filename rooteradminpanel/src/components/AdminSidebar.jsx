import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon, Dashboard, ShoppingCart, People, Category, Person } from "@mui/icons-material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar collapsed={collapsed || isMobile} style={{ height: "100vh", backgroundColor: "#1E1E2D" }}>
        <Menu>
          <Box sx={{ marginLeft: "5px",fontSize:"23px",fontWeight:"bold" }}>
            <MenuItem
              icon={
                <IconButton onClick={() => setCollapsed(!collapsed)}>
                  <Person />
                </IconButton>
              }
              disabled
              style={{ color: "#000" }}
            >
              {!collapsed && "Rooter Panel"}
            </MenuItem>
          </Box>
          <Box sx={{ marginLeft: "1px",fontSize:"23px",fontWeight:"bold",borderBottom:"1px solid #000" }}>
            <MenuItem
              disabled
              style={{ color: "#000" }}
            >
              {"Menu"}
            </MenuItem>
          </Box>
          <MenuItem icon={<Dashboard />} component={<Link to="/" />} style={{ color: "#000" }}>
            Dashboard
          </MenuItem>

          <MenuItem icon={<ShoppingCart />} component={<Link to="/products" />} style={{ color: "#000" }}>
            Products
          </MenuItem>

          <MenuItem icon={<Category />} component={<Link to="/categories" />} style={{ color: "#000" }}>
            Categories
          </MenuItem>

          <MenuItem icon={<People />} component={<Link to="/users" />} style={{ color: "#000" }}>
            Users
          </MenuItem>
          <MenuItem icon={<People />} component={<Link to="/transactions" />} style={{ color: "#000" }}>
            Transactions
          </MenuItem>
          <MenuItem icon={<AddShoppingCartIcon />} component={<Link to="/orders" />} style={{ color: "#000" }}>
            Orders
          </MenuItem>
          <MenuItem icon={<PermMediaIcon />} component={<Link to="/mediaGallery" />} style={{ color: "#000" }}>
            Media Upload
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default AdminSidebar;
