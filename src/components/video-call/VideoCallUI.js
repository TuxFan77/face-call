import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMachine } from "@xstate/react";

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
import { createVideoCallMachine } from "../../state-machines/videoCallMachine";

const VideoCallUI = () => {
  const { room } = useParams();
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const [videoCall] = useState(new VideoCall(localVideo, remoteVideo, room));
  const [state, send] = useMachine(
    createVideoCallMachine(videoCall, remoteVideo)
  );

  if (state.changed)
    console.log("currentFacingMode: ", state.context.currentFacingMode);

  useEffect(() => {
    localVideo.current.onplaying = send;
    localVideo.current.onended = send; // Safari needs this event
    localVideo.current.onsuspend = send;
    remoteVideo.current.onplaying = send;
    videoCall.onFacingMode = facingMode => {
      send({ type: "SET_FACING_MODE", facingMode });
    };
    videoCall.role = "caller";
    videoCall.start();
    return () => videoCall.endCall();
  }, [videoCall, send]);

  return (
    <VideoPageContainer
      initial="in"
      animate="normal"
      exit="out"
      variants={videoPageVariants}
      transition={pageTransition}
      onMouseMove={send}
    >
      <RemoteVideo
        ref={remoteVideo}
        visible={state.matches("active.connected")}
      />
      {state.matches("active.waiting") && <WaitingForPeer />}
      <UnmutePrompt
        visible={state.matches("active.connected.unmutePrompt.visible")}
        onClick={send}
      />
      <LocalVideo
        ref={localVideo}
        visible={state.matches("active")}
        facingMode={state.context.currentFacingMode}
      />
      <ControlBar
        onButtonClick={send}
        onMouseEnter={send}
        onMouseLeave={send}
        visible={[
          "active.connected.controlBar.momentary",
          "active.connected.controlBar.visible",
          "end.callEnded",
        ].some(state.matches)}
        isSpeakerMuted={state.matches("active.connected.speaker.muted")}
        isMicMuted={state.matches("active.connected.mic.disabled")}
      />
    </VideoPageContainer>
  );
};

export default VideoCallUI;
