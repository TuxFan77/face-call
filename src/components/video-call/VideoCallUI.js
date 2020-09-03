import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import VideoCall from "./VideoCall";
import VideoPageContainer from "./VideoPageContainer";
import LocalVideo from "./LocalVideo";
import ControlBar from "./ControlBar/ControlBar";
import RemoteVideo from "./RemoteVideo";
import {
  videoPageVariants,
  pageTransition,
} from "../../animation/pageTransition";

const VideoCallUI = () => {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const CONTROL_BAR_DELAY = 2500;
  const THROTTLE_DELAY = CONTROL_BAR_DELAY / 2;
  const controlBarTimeoutID = useRef(null);
  const throttleTimeoutID = useRef(null);
  const isMouseMoveListening = useRef(true);
  const [facingMode, setFacingMode] = useState("");
  const [isWaitingForPeer, setIsWaitingForPeer] = useState(true);
  const [isControlBarVisible, setIsControlBarVisible] = useState(true);
  const [isLocalVideoVisible, setIsLocalVideoVisible] = useState(false);
  const [isRemoteVideoVisible, setIsRemoteVideoVisible] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(true);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const role = useRef("");
  const { room } = useParams();
  const [videoCall, setVideoCall] = useState(
    new VideoCall(localVideo, remoteVideo, room)
  );

  // TEMP - this will be changing
  role.current = "caller";

  console.log("waiting for peer: ", isWaitingForPeer);

  useEffect(() => {
    setIsControlBarVisible(true);

    localVideo.current.onplaying = () => setIsLocalVideoVisible(true);
    localVideo.current.onsuspend = () => setIsLocalVideoVisible(false);

    remoteVideo.current.onplaying = () => {
      console.log("remote video playing");
      setIsWaitingForPeer(false);
      setIsRemoteVideoVisible(true);
      delayedHideControlBar();
    };
    remoteVideo.current.onsuspend = () => {
      console.log("remote video stopped");
      setIsRemoteVideoVisible(false);
      showAndLockControlBar();
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
    clearTimeout(controlBarTimeoutID.current);
    controlBarTimeoutID.current = setTimeout(() => {
      setIsControlBarVisible(false);
    }, CONTROL_BAR_DELAY);
  }

  function showAndLockControlBar() {
    clearTimeout(controlBarTimeoutID.current);
    setIsControlBarVisible(true);
  }

  function handleMouseMove() {
    if (!isMouseMoveListening.current) return;
    isMouseMoveListening.current = false;
    throttleTimeoutID.current = setTimeout(
      () => (isMouseMoveListening.current = true),
      THROTTLE_DELAY
    );
    setIsControlBarVisible(true);
    if (isRemoteVideoVisible) {
      delayedHideControlBar();
    }
  }

  function handleMouseEnter() {
    isMouseMoveListening.current = false;
    clearTimeout(throttleTimeoutID.current);
    clearTimeout(controlBarTimeoutID.current);
    setIsControlBarVisible(true);
  }

  function handleMouseLeave() {
    isMouseMoveListening.current = true;
  }

  function handleControlBarButtonClick(button) {
    switch (button) {
      case "speaker":
        setIsSpeakerMuted(prev => {
          remoteVideo.current.muted = !prev;
          return !prev;
        });
        break;

      case "mic":
        setIsMicMuted(prev => {
          videoCall.isMicMuted(!prev);
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
      <RemoteVideo ref={remoteVideo} visible={isRemoteVideoVisible} />
      <LocalVideo
        ref={localVideo}
        visible={isLocalVideoVisible}
        facingMode={facingMode}
      />
      <ControlBar
        onButtonClick={handleControlBarButtonClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        visible={isControlBarVisible}
        isSpeakerMuted={isSpeakerMuted}
        isMicMuted={isMicMuted}
      />
    </VideoPageContainer>
  );
};

export default VideoCallUI;
