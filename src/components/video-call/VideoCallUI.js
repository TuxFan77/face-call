import React, { useState, useEffect, useRef } from "react";

import VideoCall from "./VideoCall";
import VideoPageContainer from "./VideoPageContainer";
import LocalVideo from "./LocalVideo";
import ControlBar from "./ControlBar/ControlBar";
import RemoteVideo from "./RemoteVideo";
import { useQuery } from "../../hooks/hooks";
import {
  videoPageVariants,
  pageTransition
} from "../../animation/pageTransition";

const VideoCallUI = () => {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const CONTROL_BAR_DELAY = 750;
  const debounceTimeout = useRef(null);
  const throttleTimeout = useRef(null);
  const mouseMoveListening = useRef(true);
  const [controlBarVisibility, setControlBarVisibility] = useState("visible");
  const [localVideoVisible, setLocalVideoVisible] = useState("hidden");
  const [role, setRole] = useState("");

  const query = useQuery();
  useEffect(() => {
    if (query.has("isCaller")) {
      if (query.get("isCaller") === "true") {
        setRole("caller");
      }
    }
  }, [query]);

  const [videoCall, setVideoCall] = useState(
    new VideoCall(localVideo, remoteVideo, role)
  );

  useEffect(() => {
    setTimeout(() => setControlBarVisibility("hidden"), CONTROL_BAR_DELAY);
    videoCall.setLocalVideoVisibility = state => setLocalVideoVisible(state);
    videoCall.start();

    return () => {
      videoCall.endCall();
      setVideoCall(null);
    };
  }, [videoCall]);

  function handleMouseMove() {
    if (!mouseMoveListening.current) return;
    mouseMoveListening.current = false;
    throttleTimeout.current = setTimeout(
      () => (mouseMoveListening.current = true),
      CONTROL_BAR_DELAY
    );
    setControlBarVisibility("visible");
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(
      () => setControlBarVisibility("hidden"),
      CONTROL_BAR_DELAY
    );
  }

  function handleMouseEnter() {
    mouseMoveListening.current = false;
    clearTimeout(throttleTimeout.current);
    clearTimeout(debounceTimeout.current);
    setControlBarVisibility("visible");
  }

  function handleMouseLeave() {
    mouseMoveListening.current = true;
  }

  function handleControlBarButtonClick(button) {
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
        videoCall.endCall();
        break;

      default:
        break;
    }
  }

  return (
    <VideoPageContainer
      initial="in"
      animate="normal"
      exit="out"
      variants={videoPageVariants}
      transition={pageTransition}
      onMouseMove={handleMouseMove}
    >
      <RemoteVideo ref={remoteVideo} />
      <LocalVideo ref={localVideo} visible={localVideoVisible} />
      <ControlBar
        onButtonClick={handleControlBarButtonClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        visible={controlBarVisibility}
      />
    </VideoPageContainer>
  );
};

export default VideoCallUI;
