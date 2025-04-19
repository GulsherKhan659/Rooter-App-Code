import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      <Box sx={{ width: "250px", flexShrink: 0 }}>
        <AdminSidebar />
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100vh", width: "calc(100vw - 250px)" }}>
        <AdminTopbar />
        <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 2, width: "100%" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
