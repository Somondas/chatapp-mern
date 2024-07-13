import React, { Fragment, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSockets } from "../../../server/lib/helper";
import { NEW_MESSAGE } from "../constants/events";
import { useChatDetailsQuery } from "../redux/api/api";
// |+++++++++++++++++++++++++++++++++++++++++++++++++++++=====

const user = {
  _id: "klsfwi49e",
  name: "Kim",
};
const Chat = ({ chatId, members }) => {
  const containerRef = useRef();
  // const fileMenuRef = useRef();

  const socket = getSockets();

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  // chatDetails.
  console.log(socket);
  const members = chatDetails?.data?.chat?.members;
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(message);
    if (!message.trim()) return;
    // ? Emit
    socket.emit(NEW_MESSAGE, chatId, members, message);

    setMessage("");
  };

  const [message, setMessage] = useState("");
  return chatDetails.isLoading ? (
    <LayoutLoader />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* Message Render */}
        {sampleMessage.map((i) => (
          <MessageComponent message={i} key={i._id} user={user} />
        ))}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: ".5rem",
              "&:hover": {
                backgroundColor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </Fragment>
  );
};

export default AppLayout()(Chat);
