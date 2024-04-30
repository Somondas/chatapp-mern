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
import React from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
// |===========================================================

const users = [];
const SearchDialog = () => {
  const search = useInputValidation("");
  return (
    <Dialog open>
      <Stack direction={"column"} p={"2rem"} width={"25rem"}>
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
            <ListItem>
              <ListItemText primary={users.name} secondary={users.email} />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchDialog;
