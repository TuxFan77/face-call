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
import WaitingForPeer from "./WaitingForPeer";

const VideoCallUI = () => {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const CONTROL_BAR_DELAY = 2500;
  const THROTTLE_DELAY = CONTROL_BAR_DELAY / 2;
  const controlBarTimeoutID = useRef(null);
  const throttleTimeoutID = useRef(null);
  const isMouseMoveListening = useRef(false);
  const [facingMode, setFacingMode] = useState("");
  const [isWaitingForPeer, setIsWaitingForPeer] = useState(false);
  const [isUnMutePromptShowing, setIsUnMutePromptShowing] = useState(false);
  const [isControlBarVisible, setIsControlBarVisible] = useState(false);
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

  console.log("unmute prompt showing: ", isUnMutePromptShowing);

  useEffect(() => {
    localVideo.current.onplaying = () => {
      setIsWaitingForPeer(true);
      setIsLocalVideoVisible(true);
    };
    // Safari needs the onended event to detect when the local video stops playing
    localVideo.current.onended = localVideo.current.onsuspend = () => {
      setIsLocalVideoVisible(false);
    };

    remoteVideo.current.onplaying = () => {
      setIsWaitingForPeer(false);
      setIsRemoteVideoVisible(true);
      setIsUnMutePromptShowing(true);
      isMouseMoveListening.current = true;
      setIsControlBarVisible(true);
      delayedHideControlBar();
    };
    remoteVideo.current.onsuspend = () => {
      setIsRemoteVideoVisible(false);
      showAndLockControlBar();
    };

    videoCall.onFacingMode = facingMode => setFacingMode(facingMode);
    videoCall.role = role.current;
    videoCall.start();

    return () => {
      setIsWaitingForPeer(false);
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
          setIsUnMutePromptShowing(false);
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
        setIsWaitingForPeer(false);
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
      {isWaitingForPeer && <WaitingForPeer />}
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
