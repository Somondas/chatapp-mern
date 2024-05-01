import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box bgcolor={"rgba(0,0,0, .1)"} height={"100%"}>
      <Typography variant="h4" pt={"1rem"} textAlign={"center"}>
        Select A Friend to Chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
