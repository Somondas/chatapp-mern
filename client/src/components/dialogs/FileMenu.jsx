import { Menu } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu } from "../../redux/reducers/misc";

const FileMenu = ({ anchorEl }) => {
  const { isFileMenu } = useSelector((state) => state.misc);

  const dispatch = useDispatch();
  const closeFileMenu = () => dispatch(setIsFileMenu(false));
  return (
    <Menu anchorEl={anchorEl} open={isFileMenu} onClose={closeFileMenu}>
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
