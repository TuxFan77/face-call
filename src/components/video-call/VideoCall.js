import React from "react";

import PageContainer from "../../styles/global/PageContainer";
import LocalVideo from "./LocalVideo";
import { pageVariants, pageTransition } from "../../animation/pageTransition";
import initWebSocket from "../../web-socket/webSocket";

const VideoCall = () => {
  initWebSocket();

  return (
    <PageContainer
      initial="in"
      animate="normal"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <LocalVideo />
    </PageContainer>
  );
};

export default VideoCall;
