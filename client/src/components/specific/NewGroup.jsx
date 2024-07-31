import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useDispatch } from "react-redux";
import { useErrors } from "../../hooks/useErrors";
import { useAvailableFriendsQuery } from "../../redux/api/api";
// ! Use Alt + Shift + O shortcut to remove unneccesary imports
const NewGroupDialog = () => {
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery("");

  const groupName = useInputValidation("");

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

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
    console.log("submitHandler");
  };
  const closeHandler = () => {
    console.log("closeHandler");
  };
  return (
    <Dialog open>
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
          {members.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>
        <Stack direction={"row"} pt={".5rem"} justifyContent={"space-around"}>
          <Button variant="text" color={"error"}>
            Cancel
          </Button>
          <Button variant="contained" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroupDialog;
