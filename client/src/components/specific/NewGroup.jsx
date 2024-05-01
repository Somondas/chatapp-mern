import React, { memo } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { useInputValidation } from "6pp";

const NewGroupDialog = () => {
  const groupName = useInputValidation("");

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = () => {
    console.log("selectMemberHabldler");
  };
  const submitHandler = () => {
    console.log("submitHandler");
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
          {sampleUsers.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              handler={selectMemberHandler}
            />
          ))}
        </Stack>
        <Stack direction={"row"} pt={".5rem"} justifyContent={"space-around"}>
          <Button variant="text" color={"error"}>
            Cancel
          </Button>
          <Button variant="contained" onClick={submitHanlder}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroupDialog;
