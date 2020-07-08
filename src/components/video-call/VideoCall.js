import React, { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { useQuery } from "../../hooks/hooks";
import PageContainer from "../../styles/global/PageContainer";
import LocalVideo from "./LocalVideo";
import RemoteVideo from "./RemoteVideo";
import { pageVariants, pageTransition } from "../../animation/pageTransition";
import {
  initWebSocket,
  sendToServer,
  closeWebSocket
} from "../../web-socket/webSocket";
import getIceServers from "../../web-rtc/getIceServers";

let peerConnection, localVideo, remoteVideo;

let isCaller = false;

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
    (async () => {
      await initWebSocket(
        handleVideoOfferMessage,
        handleVideoAnswerMessage,
        handleNewICECandidate,
        endCall
      );

      sendToServer({
        type: "set-user-id",
        userId
      });

      if (isCaller) startCall();
    })();

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
// This function is called if we're the peer that's initiaiting the call
async function startCall() {
  console.log("startCall");

  try {
    const localStream = await navigator.mediaDevices.getUserMedia(
      mediaConstraints
    );
    localVideo.current.srcObject = localStream;
    remoteVideo.current.srcObject = new MediaStream();

    peerConnection = new RTCPeerConnection(await getIceServers());
    peerConnection.onnegotiationneeded = handleNegotiationNeeded;
    peerConnection.ontrack = handleAddTrack;

    localStream
      .getTracks()
      .forEach(track => peerConnection.addTrack(track, localStream));
  } catch (error) {
    console.log(error);
  }
}

// Handles the negotiationneeded event on the peerConnection object
// Fires when tracks are added to the peerConnection that initiated the call
async function handleNegotiationNeeded() {
  console.log("handleNegotiationNeeded");

  try {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    sendToServer({
      type: "video-offer",
      userId,
      payload: offer
    });
  } catch (error) {
    console.log(error);
  }
}

// Handles incoming video offer message over the web socket connection
// Fires if we're the callee and we receive an offer from the caller
async function handleVideoOfferMessage(offer) {
  console.log("handleVideoOfferMessage");
  console.log(offer);

  try {
    const localStream = await navigator.mediaDevices.getUserMedia(
      mediaConstraints
    );
    localVideo.current.srcObject = localStream;
    remoteVideo.current.srcObject = new MediaStream();

    peerConnection = new RTCPeerConnection(await getIceServers());
    localStream
      .getTracks()
      .forEach(track => peerConnection.addTrack(track, localStream));
    peerConnection.ontrack = handleAddTrack;

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    sendToServer({
      type: "video-answer",
      userId,
      payload: answer
    });
  } catch (error) {
    console.log(error);
  }
}

// Handles incoming video answer message over the web socket connection
// Fires if we're the caller and we're receiving an answer to our offer
async function handleVideoAnswerMessage(answer) {
  console.log("handleVideoAnswerMessage");
  console.log(answer);

  try {
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  } catch (error) {
    console.log(error);
  }
}

function handleAddTrack(e) {
  remoteVideo.current.srcObject.addTrack(
    e.track,
    remoteVideo.current.srcObject
  );
}

function handleNewICECandidate(payload) {
  console.log("handleNewICECandidate");
  console.log(payload);
}

// End the call
function endCall() {
  console.log("endCall");

  sendToServer({
    type: "end-call",
    userId,
    payload: ""
  });

  closeWebSocket();

  if (localVideo.current.srcObject) {
    localVideo.current.srcObject.getTracks().forEach(track => track.stop());
    localVideo.current.removeAttribute("src");
    localVideo.current.removeAttribute("srcObject");
  }

  if (remoteVideo.current.srcObject) {
    remoteVideo.current.srcObject.getTracks().forEach(track => track.stop());
    remoteVideo.current.removeAttribute("src");
    remoteVideo.current.removeAttribute("srcObject");
  }
}
