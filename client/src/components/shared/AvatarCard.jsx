import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";

// TODO: Transform
const AvatarCard = ({ avatar = [], max = [] }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max} sx={{ width: "100%" }}>
        <Box sx={{ width: "5rem", height: "3rem" }}>
          {avatar.map((i, index) => (
            <Avatar
              key={Math.random() * 100}
              src={i}
              alt={`Avatar ${index}`}
              sx={{
                width: "3rem",
                height: "3rem",
                border: "2px solid white",
                position: "absolute",
                left: {
                  xs: `${0.5 + index}rem`,
                  sm: `${0.5 + index}rem`,
                },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
