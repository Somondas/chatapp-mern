import { Stack, Typography } from "@mui/material";

import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{
        padding: 0,
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.1,
        }}
        style={{
          display: "flex",
          padding: "1rem",
          alignItems: "center",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          gap: "1rem",
          position: "relative",
        }}
      >
        <AvatarCard avatar={avatar} />
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
              borderRadius: "50%",
            }}
          ></div>
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
