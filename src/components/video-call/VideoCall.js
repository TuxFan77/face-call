import React, { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { useQuery } from "../../hooks/hooks";
import PageContainer from "../../styles/global/PageContainer";
import LocalVideo from "./LocalVideo";
import RemoteVideo from "./RemoteVideo";
import { pageVariants, pageTransition } from "../../animation/pageTransition";
import initWebSocket, { sendToServer } from "../../web-socket/webSocket";
import getIceServers from "../../web-rtc/getIceServers";

let localPeerConnection, localVideo, remoteVideo, ws;

let isCaller = false;
// let iceServers = {};

const userId = uuidv4();
// const callId = uuidv4();

// const mediaConstraints = {
//   audio: true,
//   video: { width: 1280, height: 720 }
// };

const mediaConstraints = {
  audio: true,
  video: true
};

const VideoCall = () => {
  const query = useQuery();
  if (query.has("isCaller")) {
    if (query.get("isCaller") === "true") {
      isCaller = true;
    }
  }

  useEffect(() => {
    initWebSocket(
      handleVideoOfferMessage,
      handleVideoAnswerMessage,
      handleNewICECandidate,
      endCall
    )
      .then(webSocket => {
        ws = webSocket;
        startCall();
      })
      .catch(err => console.log(err));

    return () => {
      endCall();
    };
  }, []);

  localVideo = useRef(null);
  remoteVideo = useRef(null);

  return (
    <PageContainer
      initial="in"
      animate="normal"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <LocalVideo ref={localVideo} />
      <RemoteVideo ref={remoteVideo} />
    </PageContainer>
  );
};

export default VideoCall;

// Start a video call
function startCall() {
  console.log("startCall");

  navigator.mediaDevices
    .getUserMedia(mediaConstraints)
    .then(stream => {
      console.log(stream);
      localVideo.current.srcObject = stream;
    })
    .catch(err => console.log(err));

  getIceServers()
    .then(iceServers => {
      localPeerConnection = new RTCPeerConnection(iceServers);
      localPeerConnection.onnegotiationneeded = handleNegotiationNeeded;
    })
    .catch(err => console.log(err));
}

function handleNegotiationNeeded() {
  console.log("handleNegotiationNeeded");
  localPeerConnection
    .createOffer()
    .then(offer => localPeerConnection.setLocalDescription(offer))
    .then(() => {
      sendToServer({
        type: "video-ofer",
        userId,
        payload: localPeerConnection.localDescription
      });
    })
    .catch(err => console.log(err));
}

function handleVideoOfferMessage() {
  console.log("handleVideoOfferMessage");
}
function handleVideoAnswerMessage() {
  console.log("handleVideoAnswerMessage");
}

function handleNewICECandidate() {
  console.log("handleNewICECandidate");
}

// End the call
function endCall() {
  console.log("endCall");

  sendToServer({
    type: "end-call",
    userId,
    payload: ""
  });

  if (ws && (ws.readyState === ws.CONNECTING || ws.readyState === ws.OPEN))
    ws.close();

  localVideo.current.srcObject.getTracks().forEach(track => track.stop());
  localVideo.current.removeAttribute("src");
  localVideo.current.removeAttribute("srcObject");
}
