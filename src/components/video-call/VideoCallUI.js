import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMachine } from "@xstate/react";

import { createVideoCallMachine } from "../../state-machines/videoCallMachine";
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
  const [isControlBarVisible, setIsControlBarVisible] = useState(false);
  const [isRemoteVideoVisible, setIsRemoteVideoVisible] = useState(false);
  const { room } = useParams();
  const [videoCall, setVideoCall] = useState(
    new VideoCall(localVideo, remoteVideo, room)
  );
  const [state, send] = useMachine(
    createVideoCallMachine(videoCall, remoteVideo)
  );

  if (state.changed) console.log(state);

  useEffect(() => {
    const sendEventWithId = e => send({ type: e.type, id: e.target.id });
    localVideo.current.onplaying = sendEventWithId;
    localVideo.current.onended = sendEventWithId; // Safari needs this event
    localVideo.current.onsuspend = sendEventWithId;

    remoteVideo.current.onplaying = () => {
      send("CONNECT");
      setIsRemoteVideoVisible(true);
      isMouseMoveListening.current = true;
      setIsControlBarVisible(true);
      delayedHideControlBar();
    };
    remoteVideo.current.onsuspend = () => {
      setIsRemoteVideoVisible(false);
      showAndLockControlBar();
    };

    videoCall.onFacingMode = facingMode => setFacingMode(facingMode);
    videoCall.role = "caller";
    videoCall.start();

    return () => {
      videoCall.endCall();
      setVideoCall(null);
    };
  }, [videoCall, send]);

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
      {state.matches("active.waiting") && <WaitingForPeer />}
      <UnmutePrompt
        visible={state.matches("active.connected.unmutePrompt.visible")}
        onClick={send}
      />
      <LocalVideo
        ref={localVideo}
        visible={state.matches("active")}
        facingMode={facingMode}
      />
      <ControlBar
        onButtonClick={send}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        visible={isControlBarVisible}
        isSpeakerMuted={state.matches("active.connected.speaker.muted")}
        isMicMuted={state.matches("active.connected.mic.disabled")}
      />
    </VideoPageContainer>
  );
};

export default VideoCallUI;
