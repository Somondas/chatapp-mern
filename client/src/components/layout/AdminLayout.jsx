import { Grid } from "@mui/material";
import React from "react";

const SideBar = () => {
  return <div>Sidebar</div>;
};
const AdminLayout = ({ children }) => {
  return (
    <>
      <Grid container minHeight={"100vh"}>
        <Grid
          item
          md={4}
          lg={3}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <SideBar />
        </Grid>
        <Grid
          item
          xs={12}
          lg={9}
          md={8}
          sx={{
            bgcolor: "#f5f",
          }}
        >
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default AdminLayout;
