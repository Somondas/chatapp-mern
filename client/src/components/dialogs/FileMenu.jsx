import { Menu } from "@mui/material";
import React from "react";

const FileMenu = ({ anchorEl }) => {
  return (
    <Menu open anchorEl={anchorEl}>
      <div
        style={{
          width: "10rem",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati vel
        maiores deserunt earum eum quasi asperiores nemo cumque inventore,
        voluptatibus corporis quo, praesentium odio qui laboriosam odit repellat
        beatae ducimus.
      </div>
    </Menu>
  );
};

export default FileMenu;
