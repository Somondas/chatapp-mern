import { Stack, Typography } from "@mui/material";

import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChatOpen,
}) => {
  return (
    <Link
      to={`/chats/${_id}`}
      onContextMenu={(e) => handleDeleteChatOpen(e, _id, groupChat)}
    >
      <div
        style={{
          display: "flex",
          padding: "1rem",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
          justifyContent: "space-between",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          gap: "1rem",
          position: "relative",
        }}
      >
        {/* Avatar Card*/}
        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>
        {isOnline && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "1rem",
              width: "10px",
              height: "10px",
              transform: "translateY(-50%)",
              backgroundColor: "green",
            }}
          ></div>
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
