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
  const CONTROL_BAR_DELAY = 2500;
  const THROTTLE_DELAY = CONTROL_BAR_DELAY / 2;
  const controlBarTimeoutID = useRef(null);
  const throttleTimeoutID = useRef(null);
  const mouseMoveListening = useRef(true);
  const [facingMode, setFacingMode] = useState("");
  const [controlBarVisibility, setControlBarVisibility] = useState("visible");
  const [localVideoVisibility, setLocalVideoVisibility] = useState("hidden");
  const [remoteVideoVisibility, setRemoteVideoVisibility] = useState("hidden");
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
    setControlBarVisibility("visible");
    videoCall.onLocalVideoVisibility = visibility =>
      setLocalVideoVisibility(visibility);
    videoCall.onRemoteVideoVisibility = visibility => {
      console.log(`setRemoteVideoVisibility(${visibility})`);
      setRemoteVideoVisibility(visibility);
      setControlBarVisibility("visible");
      if (visibility === "visible") delayedHideControlBar();
    };
    videoCall.onFacingMode = facingMode => setFacingMode(facingMode);
    videoCall.role = role.current;
    videoCall.start();

    return () => {
      videoCall.endCall();
      setVideoCall(null);
    };
  }, [videoCall]);

  function delayedHideControlBar() {
    console.log("delayedHideControlBar");
    clearTimeout(controlBarTimeoutID.current);
    controlBarTimeoutID.current = setTimeout(
      () => setControlBarVisibility("hidden"),
      CONTROL_BAR_DELAY
    );
  }

  function handleMouseMove() {
    if (!mouseMoveListening.current) return;
    mouseMoveListening.current = false;
    throttleTimeoutID.current = setTimeout(
      () => (mouseMoveListening.current = true),
      THROTTLE_DELAY
    );
    setControlBarVisibility("visible");
    if (remoteVideoVisibility === "visible") delayedHideControlBar();
  }

  function handleMouseEnter() {
    mouseMoveListening.current = false;
    clearTimeout(throttleTimeoutID.current);
    clearTimeout(controlBarTimeoutID.current);
    setControlBarVisibility("visible");
  }

  function handleMouseLeave() {
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
        videoCall.switchCameras();
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
      <RemoteVideo ref={remoteVideo} visible={remoteVideoVisibility} />
      <LocalVideo
        ref={localVideo}
        visible={localVideoVisibility}
        facingMode={facingMode}
      />
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
