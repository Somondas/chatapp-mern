import { Menu, MenuList, Tooltip } from "@mui/material";
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
      <MenuList>
        <MenuItem>
          <Tooltip title="Image">
            <ImageIcon />
          </Tooltip>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FileMenu;
