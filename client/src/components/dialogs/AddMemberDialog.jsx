import { Dialog, DialogTitle, Stack } from "@mui/material";
import React from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  return (
    <Dialog open>
      <DialogTitle>Add Member</DialogTitle>
      <Stack>
        {sampleUsers.map((i) => (
          <UserItem key={i.id} user={i} handler={addFriendHandler} />
        ))}
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
