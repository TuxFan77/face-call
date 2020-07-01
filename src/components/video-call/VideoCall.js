import React from "react";

import PageContainer from "../../styles/global/PageContainer";
import LocalVideo from "./LocalVideo";
import { pageVariants, pageTransition } from "../../animation/pageTransition";
import initWebSocket from "../../web-socket/webSocket";
import getIceServers from "../../web-rtc/getIceServers";

const VideoCall = () => {
  initWebSocket();
  getIceServers()
    .then(iceServers => console.log(iceServers))
    .catch(err => console.log(err));

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
