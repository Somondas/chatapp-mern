import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu } from "../../redux/reducers/misc";
import { Image as ImageIcon } from "@mui/icons-material";

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
        <MenuList>
          <MenuItem>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: ".5rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/gif"
              style={{
                display: "none",
              }}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
