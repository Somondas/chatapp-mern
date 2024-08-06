import {
  Close as CloseIcon,
  Groups as GroupsIcon,
  Dashboard as DashboardIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { Link as LinkComponent, Navigate, useLocation } from "react-router-dom";
import { grayColor, matBlack } from "../../constants/color";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunks/admin";

// >> Styled Component
const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;
// >> adminTabs constant
const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
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
  const location = useLocation();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(adminLogout());
  };
  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Chattu
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link
            sx={
              location.pathname === tab.path && {
                bgcolor: matBlack,
                color: "white",
                ":hover": { color: "white" },
              }
            }
            key={tab.path}
            to={tab.path}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon />
            <Typography fontSize={"1.2rem"}>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  // const isAdmin = true;
  const { isAdmin } = useSelector((state) => state.auth);

  // -> States--------------------------------
  const [isMobile, setIsMobile] = useState(false);

  // -> Handlers----------------------------------
  const handleMobile = () => setIsMobile(!isMobile);
  const handleClose = () => setIsMobile(false);

  if (!isAdmin) return <Navigate to="/admin" />;
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
            bgcolor: grayColor,
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
