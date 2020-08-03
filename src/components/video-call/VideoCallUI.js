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
  const CONTROL_BAR_DELAY = 1500;
  const THROTTLE_DELAY = CONTROL_BAR_DELAY / 2;
  const debounceTimeoutID = useRef(null);
  const throttleTimeoutID = useRef(null);
  const mouseMoveListening = useRef(true);
  const [controlBarVisibility, setControlBarVisibility] = useState("visible");
  const [localVideoVisible, setLocalVideoVisible] = useState("hidden");
  const [speakerMuted, setSpeakerMuted] = useState(true);
  const [micMuted, setMicMuted] = useState(false);
  const role = useRef("");
  const [videoCall, setVideoCall] = useState(
    new VideoCall(localVideo, remoteVideo)
  );

  const query = useQuery();
  useEffect(() => {
    if (query.has("isCaller")) {
      if (query.get("isCaller") === "true") {
        role.current = "caller";
      }
    }
  }, [query]);

  useEffect(() => {
    setTimeout(() => setControlBarVisibility("hidden"), CONTROL_BAR_DELAY);
    videoCall.setLocalVideoVisibility = state => setLocalVideoVisible(state);
    videoCall.role = role.current;
    videoCall.start();

    return () => {
      videoCall.endCall();
      setVideoCall(null);
    };
  }, [videoCall]);

  function handleMouseMove() {
    if (!mouseMoveListening.current) return;
    console.log("handleMouseMove");
    mouseMoveListening.current = false;
    throttleTimeoutID.current = setTimeout(
      () => (mouseMoveListening.current = true),
      THROTTLE_DELAY
    );
    setControlBarVisibility("visible");
    clearTimeout(debounceTimeoutID.current);
    debounceTimeoutID.current = setTimeout(
      () => setControlBarVisibility("hidden"),
      CONTROL_BAR_DELAY
    );
  }

  function handleMouseEnter() {
    console.log("handleMouseEnter");
    mouseMoveListening.current = false;
    clearTimeout(throttleTimeoutID.current);
    clearTimeout(debounceTimeoutID.current);
    setControlBarVisibility("visible");
  }

  function handleMouseLeave() {
    console.log("handleMouseLeave");
    mouseMoveListening.current = true;
  }

  function handleControlBarButtonClick(button) {
    switch (button) {
      case "speaker":
        setSpeakerMuted(prev => {
          remoteVideo.current.muted = !prev;
          return !prev;
        });
        break;

      case "mic":
        setMicMuted(prev => {
          videoCall.micMuted(!prev);
          return !prev;
        });
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
        speakerMuted={speakerMuted}
        micMuted={micMuted}
      />
    </VideoPageContainer>
  );
};

export default VideoCallUI;
