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
import React, { memo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { samepleChats } from "../constants/sampleData/";
// >> Main Component
const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  // ? State variables------------
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  console.log(chatId);
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
  // >> Icon Buttons
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
  const GroupName = (
    <Stack>
      {isEdit ? (
        <></>
      ) : (
        <>
          <Typography variant="h4">Group Name</Typography>
        </>
      )}
    </Stack>
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
          <GroupsList myGroups={samepleChats} chatId={chatId} />
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
          {GroupName}
        </Grid>
        <Drawer
          sx={{
            display: { xs: "block", sm: "none" },
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileClose}
        >
          <GroupsList w={"50vw"} myGroups={samepleChats} chatId={chatId} />
        </Drawer>
      </Grid>
    </>
  );
};
// >> GroupList Component________------------_________
const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack weight={w}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem key={group._id} group={group} chatId={chatId} />
      ))
    ) : (
      <Typography>No Groups</Typography>
    )}
  </Stack>
);
// >> GroupListItem Component
const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
      to={`?group=${_id}`}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});
export default Groups;
