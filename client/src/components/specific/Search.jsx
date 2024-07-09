import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";
// |===========================================================

const SearchDialog = () => {
  const search = useInputValidation("");
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const addFriendHandler = async (id) => {
    console.log(id);
    try {
      const res = await sendFriendRequest({ userId: id });
      if (res.data) {
        toast.success("Friend request sent");
        console.log(res.data);
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest] = useSendFriendRequestMutation();

  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      // console.log(search.value);
      searchUser(search.value).then(({ data }) => {
        console.log(data);

        setUsers(data.allUsersExceptMeAndFriends);
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
