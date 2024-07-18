import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../constants/events";
import { useChatDetailsQuery } from "../redux/api/api";
import { useSocketEvents } from "../hooks/hook";
// |+++++++++++++++++++++++++++++++++++++++++++++++++++++=====

const Chat = ({ chatId, user }) => {
  const containerRef = useRef();
  // const fileMenuRef = useRef();
  const socket = getSocket();
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const errors = [{ isError: chatDetails.isError, error: chatDetails.error }];
  // console.log(messages);
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const members = chatDetails?.data?.chat?.members;
  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const newMessagesHandler = useCallback((data) => {
    // console.log(data);
    setMessages((prev) => [...prev, data.message]);
  }, []);

  const eventHandler = { [NEW_MESSAGE]: newMessagesHandler };

  useSocketEvents(socket, eventHandler);

  useEffect(() => {
    socket.on(NEW_MESSAGE, newMessagesHandler);
    return () => {
      socket.off(NEW_MESSAGE, newMessagesHandler);
    };
  }, []);

  return chatDetails.isLoading ? (
    <Skeleton />
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
        {messages.map((i) => (
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
