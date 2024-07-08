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
import React, { useEffect, useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { orange } from "@mui/material/colors";
import { orangeLight } from "../../constants/color";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import { useLazySearchUserQuery } from "../../redux/api/api";
// |===========================================================

const SearchDialog = () => {
  const search = useInputValidation("");
  const dispatch = useDispatch();
  const [users, setUsers] = useState(sampleUsers);
  const addFriendHandler = (id) => {
    console.log(id);
  };
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      // console.log(search.value);
      searchUser(search.value).then(({ data }) => {
        console.log(data);
        // setUsers(data);
      });
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);
  let isLoadingSendFriendRequest = false;
  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
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
