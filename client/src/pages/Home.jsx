import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Typography } from "@mui/material";

const Home = () => {
  return (
    <Typography variant="h4" pt={"1rem"} textAlign={"center"}>
      Select A Friend to Chat
    </Typography>
  );
};

export default AppLayout()(Home);
