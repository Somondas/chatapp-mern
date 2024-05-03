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
  const isMember = false;
  // -> State variables------------
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  // console.log(chatId);
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
  // -> UseEffect--------------------
  useEffect(() => {
    setGroupName(`Group Name ${chatId}`);
    setGroupNameUpdatedValue(`Group Name ${chatId}`);

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
                spacing={"2rem"}
                bgcolor={"bisque"}
                hight={"50vh"}
                overflow={"auto"}
              ></Stack>
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
