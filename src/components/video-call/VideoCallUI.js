import React, { useState, useEffect, useRef } from "react";

import VideoCall from "./VideoCall";
import VideoPageContainer from "./VideoPageContainer";
import LocalVideo from "./LocalVideo";
import ControlsBar from "./ControlsBar/ControlsBar";
import RemoteVideo from "./RemoteVideo";
import { useQuery } from "../../hooks/hooks";
import {
  videoPageVariants,
  pageTransition
} from "../../animation/pageTransition";

const VideoCallUI = () => {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  let role = "";

  const query = useQuery();
  if (query.has("isCaller")) {
    if (query.get("isCaller") === "true") {
      role = "caller";
    }
  }

  const [videoCall, setVideoCall] = useState(
    new VideoCall(localVideo, remoteVideo, role)
  );

  useEffect(() => {
    videoCall.start();
    return () => {
      videoCall.endCall();
      setVideoCall(null);
    };
  }, [videoCall]);

  const handleControlsBarButtonClick = button => {
    switch (button) {
      case "speaker":
        remoteVideo.current.muted = !remoteVideo.current.muted;
        console.log(`remoteVideo.current.muted=${remoteVideo.current.muted}`);
        break;

      case "mic":
        console.log("toggle mic");
        break;

      case "flip":
        console.log("toggle flip");
        break;

      case "end":
        console.log("end call button clicked");
        videoCall.endCall();
        break;

      default:
        break;
    }
  };

  return (
    <VideoPageContainer
      initial="in"
      animate="normal"
      exit="out"
      variants={videoPageVariants}
      transition={pageTransition}
    >
      <RemoteVideo ref={remoteVideo} />
      <LocalVideo ref={localVideo} />
      <ControlsBar
        onButtonClick={handleControlsBarButtonClick}
        remoteVideoRef={remoteVideo}
      />
    </VideoPageContainer>
  );
};

export default VideoCallUI;
