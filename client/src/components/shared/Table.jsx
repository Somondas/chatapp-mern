import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { matBlack } from "../../constants/color";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "1rem 4rem",
          margin: "auto",
          width: "100%",
          overflow: "auto",
          borderRadius: "1rem",
          boxShadow: "none",
          height: "100%",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{
            margin: "2rem",
            textTransform: "uppercase",
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          sx={{
            border: "none",
            ".table-header": {
              bgcolor: matBlack,
              color: "white",
            },
          }}
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
        />
      </Paper>
    </Container>
  );
};

export default Table;
