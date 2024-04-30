import { Stack } from "@mui/material";
import React from "react";

const Profile = () => {
  return (
    <Stack direction={"column"} spacing={"2rem"} alignItems={"center"}>
      <ProfileCard />
    </Stack>
  );
};

const ProfileCard = () => <div>ProfileCard</div>;

export default Profile;
