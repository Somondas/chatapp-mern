import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { orange } from "@mui/material/colors";
import { orangeLight } from "../../constants/color";
// |===========================================================

const SearchDialog = () => {
  const search = useInputValidation("");

  const [users, setUsers] = useState(sampleUsers);
  const addFriendHandler = (id) => {
    console.log(id);
  };
  let isLoadingSendFriendRequest = false;
  return (
    <Dialog open>
      <Stack
        sx={{
          borderBottom: `.5rem solid #ea7070`,
        }}
        direction={"column"}
        p={"2rem"}
        width={"25rem"}
      >
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchDialog;
