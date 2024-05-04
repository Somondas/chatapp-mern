import {
  Close as CloseIcon,
  Groups as GroupsIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

// >> adminTabs constant
const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/user-management",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats-management",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

// >> SideBar
const SideBar = ({ w = "100&" }) => {
  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Chattu
      </Typography>
    </Stack>
  );
};
const AdminLayout = ({ children }) => {
  // -> States--------------------------------
  const [isMobile, setIsMobile] = useState(false);

  // -> Handlers----------------------------------
  const handleMobile = () => setIsMobile(!isMobile);
  const handleClose = () => setIsMobile(false);
  return (
    <>
      <Grid container minHeight={"100vh"}>
        <Box
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
            position: "fixed",
            right: "1rem",
            top: "1rem",
          }}
        >
          <IconButton onClick={handleMobile}>
            {isMobile ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Grid
          item
          md={4}
          lg={3}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <SideBar />
        </Grid>
        <Grid
          item
          xs={12}
          lg={9}
          md={8}
          sx={{
            bgcolor: "#f5f",
          }}
        >
          {children}
        </Grid>
        <Drawer open={isMobile} onClose={handleClose}>
          <SideBar w={"50vw"} />
        </Drawer>
      </Grid>
    </>
  );
};

export default AdminLayout;
