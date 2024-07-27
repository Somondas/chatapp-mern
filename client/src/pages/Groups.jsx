import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { samepleChats } from "../constants/sampleData/";
import { sampleUsers } from "../constants/sampleData.js";
import UserItem from "../components/shared/UserItem.jsx";
import { bgGradient, bgGradientBluePink } from "../constants/color.js";
import { useMyGroupsQuery } from "../redux/api/api.js";
import { useErrors } from "../hooks/hook.jsx";
import { LayoutLoader } from "../components/layout/Loaders.jsx";

// -> Lazy Imports
const ConfirmDelteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog.jsx")
);

// >> Main Component
const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();

  const myGroups = useMyGroupsQuery("");

  const isMember = false;
  // -> State variables------------
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  // console.log(chatId);

  console.log(myGroups.data);
  const error = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
  ];
  useErrors();

  // -> Handlers------

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
  const updateGroupName = () => {
    setIsEdit(false);
    console.log("group name updated");
  };
  const openconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log("Delete Group");
  };
  const closeconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };
  const deleteHandler = () => {
    closeconfirmDeleteHandler();
  };
  const openAddMemberHandler = () => {};
  const removeMemberHandler = (id) => {
    console.log("Member ", id);
  };
  // -> UseEffect--------------------
  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);
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
  // >> Group Name Component
  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );
  // >> ButtonGroup Component
  const ButtonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openconfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Group
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <>
      <Grid container height={"100vh"}>
        <Grid
          item
          sx={{
            display: { xs: "none", sm: "block" },
            backgroundImage: bgGradientBluePink,
            overflow: "auto",
            height: "100%",
          }}
          sm={4}
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
          bgcolor="rgba(0,0,0,0.1)"
          xs={12}
          sm={8}
        >
          {IconBtns}

          {groupName && (
            <>
              {GroupName}
              <Typography
                margin={"2rem"}
                alignSelf={"flex-start"}
                variant="body1"
              >
                Members
              </Typography>
              <Stack
                maxWidth={"45rem"}
                width={"100%"}
                boxSizing={"border-box"}
                padding={{
                  sm: "1rem",
                  xs: "0",
                  md: " 1rem 4rem",
                }}
                sx={{
                  overflow: "auto",
                  // height: "100%",
                }}
                height={"45vh"}
                spacing={"1rem"}
              >
                {sampleUsers.map((i) => (
                  <UserItem
                    key={i._id}
                    user={i}
                    isAdded
                    styling={{
                      boxShadow: "0 0 .5rem rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                  />
                ))}
              </Stack>
              {ButtonGroup}
            </>
          )}
        </Grid>
        {isMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberDialog />
          </Suspense>
        )}
        {confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDelteDialog
              open={confirmDeleteDialog}
              handleClose={closeconfirmDeleteHandler}
              deleteHandler={deleteHandler}
            />
          </Suspense>
        )}
        <Drawer
          sx={{
            display: { xs: "block", sm: "none" },
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileClose}
        >
          <Stack
            sx={{
              backgroundImage: bgGradientBluePink,
              height: "100%",
            }}
          >
            <GroupsList w={"50vw"} myGroups={samepleChats} chatId={chatId} />
          </Stack>
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
