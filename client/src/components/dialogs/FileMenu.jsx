import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu } from "../../redux/reducers/misc";
import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  UploadFile as UploadFileIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";

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
        {/* First ======================= */}
        <MenuList>
          <MenuItem>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: ".5rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4, video/webm, video/ogg"
              style={{
                display: "none",
              }}
              onChange={(e) => fileChangeHandler(e, "Videos")}
            />
          </MenuItem>
        </MenuList>
        {/* Second ======================= */}
        <MenuList>
          <MenuItem>
            <Tooltip title="Audio">
              <AudioFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: ".5rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/gif"
              style={{
                display: "none",
              }}
              onChange={(e) => fileChangeHandler(e, "Images")}
            />
          </MenuItem>
        </MenuList>
        {/* Third ======================= */}
        <MenuList>
          <MenuItem>
            <Tooltip title="Video">
              <VideoFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: ".5rem" }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/gif"
              style={{
                display: "none",
              }}
              onChange={(e) => fileChangeHandler(e, "Videos")}
            />
          </MenuItem>
        </MenuList>
        {/* Fourth ======================= */}
        <MenuList>
          <MenuItem>
            <Tooltip title="File">
              <UploadFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: ".5rem" }}>File</ListItemText>
            <input
              type="file"
              multiple
              accept="*"
              style={{
                display: "none",
              }}
              onChange={(e) => fileChangeHandler(e, "Files")}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
