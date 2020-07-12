import React, { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import VideoPageContainer from "./VideoPageContainer";
import LocalVideo from "./LocalVideo";
import RemoteVideo from "./RemoteVideo";
import { useQuery } from "../../hooks/hooks";
import getMediaStream from "../../utils/getMediaStream";
import { pageVariants, pageTransition } from "../../animation/pageTransition";
import {
  initWebSocket,
  sendToServer,
  closeWebSocket
} from "../../web-socket/webSocket";
import getIceServers from "../../web-rtc/getIceServers";

let peerConnection, localVideo, remoteVideo;

const userId = uuidv4();
// const callId = uuidv4();

const VideoCall = () => {
  let isCaller = false;

  const query = useQuery();
  if (query.has("isCaller")) {
    if (query.get("isCaller") === "true") {
      isCaller = true;
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await initLocalVideo();

        await initWebSocket(
          handleVideoOfferMessage,
          handleVideoAnswerMessage,
          handleNewRemoteICECandidate,
          endCall
        );

        sendToServer({
          type: "set-user-id",
          userId
        });

        if (isCaller) startCall();
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      endCall();
    };
  }, [isCaller]);

  localVideo = useRef(null);
  remoteVideo = useRef(null);

  return (
    <VideoPageContainer
      initial="in"
      animate="normal"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <RemoteVideo ref={remoteVideo} />
      <LocalVideo ref={localVideo} />
    </VideoPageContainer>
  );
};

export default VideoCall;

// Initialize the local video element with the webcam feed
async function initLocalVideo() {
  localVideo.current.srcObject = await getMediaStream();
}

// Start a video call
// This function is called if we're the peer that's initiaiting the call
async function startCall() {
  console.log("startCall");

  try {
    peerConnection = new RTCPeerConnection(await getIceServers());
    peerConnection.onnegotiationneeded = handleNegotiationNeeded;
    peerConnection.ontrack = handleAddTrack;
    peerConnection.onicecandidate = handleNewLocalICECandidate;

    const localStream = localVideo.current.srcObject;
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

  try {
    peerConnection = new RTCPeerConnection(await getIceServers());
    peerConnection.ontrack = handleAddTrack;
    peerConnection.onicecandidate = handleNewLocalICECandidate;

    const localStream = localVideo.current.srcObject;

    localStream
      .getTracks()
      .forEach(track => peerConnection.addTrack(track, localStream));

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

  try {
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  } catch (error) {
    console.log(error);
  }
}

// Handles incoming tracks from the remote peer
// Adds the tracks to the remote video player
// Fires when remote tracks come in
function handleAddTrack(e) {
  console.log("handleAddTrack");
  if (remoteVideo.current.srcObject) return;
  remoteVideo.current.srcObject = e.streams[0];
}

// Sends locally generated ICE candidates to the remote peer
function handleNewLocalICECandidate(e) {
  console.log("handleNewLocalICECandidate");
  if (!e.candidate) {
    console.log("NO LOCAL CANDIDATE");
    return;
  }
  sendToServer({
    type: "new-ice-candidate",
    userId,
    payload: e.candidate
  });
}

// Receives ICE candidates from the remote peer
// and adds them to the local peer connection
async function handleNewRemoteICECandidate(candidate) {
  console.log("handleNewRemoteICECandidate");
  if (!peerConnection) {
    console.log("NO REMOTE CANDIDATE");
    return;
  }
  try {
    await peerConnection.addIceCandidate(candidate);
  } catch (error) {
    console.log(error);
  }
}

// End the call and cleans up resources
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

  peerConnection = null;
}
