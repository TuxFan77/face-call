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
import UnmutePrompt from "./UnmutePrompt";

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
  const [isUnMutePromptVisible, setIsUnMutePromptVisible] = useState(false);
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

  useEffect(() => {
    document.onvisibilitychange = () => {
      const { visibilityState } = document;
      visibilityState === "visible"
        ? videoCall.muteVideo(false)
        : videoCall.muteVideo(true);
    };

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
      setIsUnMutePromptVisible(true);
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
    videoCall.onEndCall = () => {
      setIsWaitingForPeer(false);
      setIsUnMutePromptVisible(false);
    };
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

  function handleUnmutePromptClick() {
    setIsSpeakerMuted(false);
    setIsUnMutePromptVisible(false);
    remoteVideo.current.muted = false;
  }

  function handleControlBarButtonClick(button) {
    switch (button) {
      case "speaker":
        setIsSpeakerMuted(prevState => {
          if (prevState) setIsUnMutePromptVisible(false);
          remoteVideo.current.muted = !prevState;
          return !prevState;
        });
        break;

      case "mic":
        setIsMicMuted(prevState => {
          videoCall.muteMic(!prevState);
          return !prevState;
        });
        break;

      case "flip":
        videoCall.switchCameras();
        break;

      case "end":
        setIsWaitingForPeer(false);
        setIsUnMutePromptVisible(false);
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
      <UnmutePrompt
        visible={isUnMutePromptVisible}
        onClick={handleUnmutePromptClick}
      />
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
