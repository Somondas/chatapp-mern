import React from "react";

const RenderAttachment = (file, url) => {
  switch (file) {
    case "video":
      return <video src={url} controls width={"200px"} />;
      break;
    case "image":
      return <img src={url} alt="Attachment" />;
  }
};

export default RenderAttachment;
