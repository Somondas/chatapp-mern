import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import toast from "react-hot-toast";
import { useAsyncError } from "react-router-dom";
// ! Use Alt + Shift + O shortcut to remove unneccesary imports
const NewGroupDialog = () => {
  const dispatch = useDispatch();

  const { isNewGroup } = useSelector((state) => state.misc);

  const { isError, isLoading, error, data } = useAvailableFriendsQuery("");

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation());

  const groupName = useInputValidation("");

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  console.log(data);
  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    // setMembers((prev) =>
    //   prev.map((user) =>
    //     user._id === id ? { ...user, isAdded: !user.isAdded } : user
    //   )
    // );
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentElement) => currentElement !== id)
        : [...prev, id]
    );
  };
  console.log(selectedMembers);
  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("You need to add atleast 3 members");
    // Creating groupt
    newGroup("Creating New Group", {
      name: groupName.value,
      members: selectedMembers,
    });
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  return (
    <Dialog onClose={closeHandler} open={isNewGroup}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"}>
        <DialogTitle textAlign={"center"}>New Group</DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography variant="h6" pt={"1rem"}>
          Members
        </Typography>

        <Stack pt={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          )}
        </Stack>
        <Stack direction={"row"} pt={".5rem"} justifyContent={"space-around"}>
          <Button
            variant="text"
            color={"error"}
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroupDialog;
