import { KeyboardBackspace as KeyboardBackspaceIcon } from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";
import React from "react";

const Groups = () => {
  const IconBtns = (
    <>
      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            left: "2rem",
            top: "2rem",
            bgcolor: "rgba(0,0,0,0.9)",
            color: "white",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  return (
    <>
      <Grid container height={"100vh"}>
        <Grid
          item
          sx={{
            display: { xs: "none", sm: "block" },
          }}
          sm={4}
          bgcolor={"bisque"}
        >
          Groups
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "1rem 3rem",
            position: "relative",
          }}
          xs={12}
          sm={8}
        >
          {IconBtns}
        </Grid>
      </Grid>
    </>
  );
};

export default Groups;
