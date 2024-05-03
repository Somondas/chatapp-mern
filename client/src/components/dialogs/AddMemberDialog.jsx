import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const addFriendHandler = () => {};
  const addMemberSubmitHandler = () => {};
  const closeHandler = () => {};
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentElement) => currentElement !== id)
        : [...prev, id]
    );
  };
  return (
    <Dialog open onClose={closeHandler}>
      <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <Stack spacing={"1rem"}>
          {sampleUsers.length > 0 ? (
            sampleUsers.map((i) => (
              <UserItem key={i._id} user={i} handler={addFriendHandler} />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={selectMemberHandler}
            variant="contained"
            disabled={isLoadingAddMember}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
