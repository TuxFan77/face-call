import React from "react";

import PageContainer from "../../styles/global/PageContainer";
import LocalVideo from "./LocalVideo";
import { pageVariants, pageTransition } from "../../animation/pageTransition";
import initWebSocket, { sendToServer } from "../../web-socket/webSocket";
import getIceServers from "../../web-rtc/getIceServers";

const VideoCall = () => {
  initWebSocket();
  console.log(getIceServers());

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
