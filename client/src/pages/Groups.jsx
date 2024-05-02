import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Groups = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate("/");
  };
  const handleMobile = () => {
    // navigate("/mobile");
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };
  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="Back">
        <IconButton
          onClick={navigateBack}
          sx={{
            position: "absolute",
            left: "2rem",
            top: "2rem",
            bgcolor: "rgba(0,0,0,0.9)",
            color: "white",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  return (
    <>
      <Grid container height={"100vh"}>
        <Grid
          item
          sx={{
            display: { xs: "none", sm: "block" },
          }}
          sm={4}
          bgcolor={"bisque"}
        >
          Groups
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "1rem 3rem",
            position: "relative",
          }}
          xs={12}
          sm={8}
        >
          {IconBtns}
        </Grid>
        <Drawer
          sx={{
            display: { xs: "block", sm: "none" },
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileClose}
        >
          Group List
        </Drawer>
      </Grid>
    </>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack>
    {myGroups.length > 0 ? (
      myGroups.map((group) => {})
    ) : (
      <Typography>No Groups</Typography>
    )}
  </Stack>
);
export default Groups;
