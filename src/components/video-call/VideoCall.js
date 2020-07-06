import React, { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { useQuery } from "../../hooks/hooks";
import PageContainer from "../../styles/global/PageContainer";
import LocalVideo from "./LocalVideo";
import RemoteVideo from "./RemoteVideo";
import { pageVariants, pageTransition } from "../../animation/pageTransition";
import initWebSocket, { sendToServer } from "../../web-socket/webSocket";
import getIceServers from "../../web-rtc/getIceServers";

let localPeerConnection, localVideo, remoteVideo;

let isCaller = false;
let iceServers = {};

const userId = uuidv4();
// const callId = uuidv4();

const mediaConstraints = {
  audio: true,
  video: { width: 1280, height: 720 }
};

const VideoCall = () => {
  const query = useQuery();
  if (query.has("isCaller")) {
    if (query.get("isCaller") === "true") {
      isCaller = true;
    }
  }

  useEffect(() => {
    let ws;

    initWebSocket(
      handleVideoOfferMessage,
      handleVideoAnswerMessage,
      handleNewICECandidate,
      endCall
    )
      .then(result => {
        ws = result;
        getIceServers()
          .then(data => {
            iceServers = data;
            if (isCaller) {
              initiateCall();
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    return () => {
      endCall();
      if (ws.OPEN || ws.CONNECTING) ws.close();
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

// Initiate a call
function initiateCall() {
  if (localPeerConnection) {
    alert("You can't start another call when one is already open.");
    return;
  }

  console.log("initiateCall");

  sendToServer({
    type: "set-user-id",
    userId
  });

  createPeerConnection();

  navigator.mediaDevices
    .getUserMedia(mediaConstraints)
    .then(localStream => {
      localVideo.current.srcObject = localStream;
      localStream
        .getTracks()
        .forEach(track => localPeerConnection.addTrack(track, localStream));
      // showVideo(localVideo);
    })
    .catch(err => handleGetUserMediaError(err));
}

// Create local peer connection
function createPeerConnection() {
  console.log("Creating local peer connection");
  localPeerConnection = new RTCPeerConnection(iceServers);

  localPeerConnection.onnegotiationneeded = handleNegotiationNeeded;
  localPeerConnection.onicecandidate = handleICECandidate;
  localPeerConnection.ontrack = handleTrack;
  localPeerConnection.onremovetrack = handleRemoveTrack;
  localPeerConnection.oniceconnectionstatechange = handleICEConnectionStateChange;

  // localPeerConnection.onicegatheringstatechange = handleICEGatheringStateChange;
  // localPeerConnection.onsignalingstatechange = handleSignalingStateChange;
}

// Handles the negotiation needed state of the local peer connection
function handleNegotiationNeeded() {
  console.log("handleNegotiationNeeded");

  localPeerConnection
    .createOffer()
    .then(offer => {
      return localPeerConnection.setLocalDescription(offer);
    })
    .then(() => {
      console.log("Offer created... sending to signaling server");
      sendToServer({
        type: "video-offer",
        userId,
        payload: localPeerConnection.localDescription
      });
    })
    .catch(err => reportError(err));
}

// Send locally generated ICE candidates to the remote connection
function handleICECandidate({ candidate }) {
  console.log("handleICECandidate");

  if (candidate) {
    sendToServer({
      type: "new-ice-candidate",
      userId,
      payload: candidate
    });
  }
}

// Handle incoming ICE candidates from the remote connection
function handleNewICECandidate(data) {
  console.log("handleNewICECandidate");

  const candidate = new RTCIceCandidate(data);
  localPeerConnection
    .addIceCandidate(candidate)
    .catch(err => console.error(err));
}

// Add incoming tracks to remote video display
function handleTrack({ streams }) {
  console.log("handleTrack");

  remoteVideo.current.srcObject = streams[0];
  // showVideo(remoteVideo);
}

// Called when the remote peer removes a track
function handleRemoveTrack() {
  console.log("handleRemoveTrack");

  const trackList = remoteVideo.current.srcObject.getTracks();

  if (trackList.length === 0) {
    endCall();
  }
}

// Handle changes to the connection state
function handleICEConnectionStateChange() {
  console.log(
    "handleICEConnectionStateChange",
    localPeerConnection.iceConnectionState
  );

  switch (localPeerConnection.iceConnectionState) {
    case "closed":
    case "failed":
    case "disconnected":
      endCall();
      break;
    default:
      break;
  }
}

// Video offer handler
function handleVideoOfferMessage(sdp) {
  console.log("handleVideoOfferMessage");

  createPeerConnection();

  const description = new RTCSessionDescription(sdp);

  localPeerConnection
    .setRemoteDescription(description)
    .then(() => {
      return navigator.mediaDevices.getUserMedia(mediaConstraints);
    })
    .then(localStream => {
      localVideo.current.srcObject = localStream;
      localStream
        .getTracks()
        .forEach(track => localPeerConnection.addTrack(track, localStream));
      // showVideo(localVideo);
    })
    .then(() => {
      return localPeerConnection.createAnswer();
    })
    .then(answer => {
      return localPeerConnection.setLocalDescription(answer);
    })
    .then(() => {
      sendToServer({
        type: "set-user-id",
        userId
      });

      sendToServer({
        type: "video-answer",
        userId,
        payload: localPeerConnection.localDescription
      });

      // toggleCallButton.textContent = "End Call";
      // toggleMuteButton.disabled = false;
    })
    .catch(err => handleGetUserMediaError(err));
}

// Video answer handler
function handleVideoAnswerMessage(sdp) {
  console.log("handleVideoAnswerMessage");

  const description = new RTCSessionDescription(sdp);

  localPeerConnection
    .setRemoteDescription(description)
    .catch(err => reportError(err));
}

// End the call
function endCall() {
  console.log("endCall");

  sendToServer({
    type: "end-call",
    userId
  });

  closeVideoCall();
}

// Stop the media streams, clean up and dispose of the peer connection object
function closeVideoCall() {
  console.log("closeVideoCall");

  if (localPeerConnection) {
    localPeerConnection.ontrack = null;
    localPeerConnection.onremovetrack = null;
    localPeerConnection.onremovestream = null;
    localPeerConnection.onicecandidate = null;
    localPeerConnection.oniceconnectionstatechange = null;
    localPeerConnection.onsignalingstatechange = null;
    localPeerConnection.onicegatheringstatechange = null;
    localPeerConnection.onnegotiationneeded = null;

    if (remoteVideo.current.srcObject) {
      remoteVideo.current.srcObject.getTracks().forEach(track => track.stop());
    }

    if (localVideo.current.srcObject) {
      localVideo.current.srcObject.getTracks().forEach(track => track.stop());
    }

    localPeerConnection.close();
    localPeerConnection = null;
  }

  // hideVideo(localVideo);
  // hideVideo(remoteVideo);

  localVideo.current.removeAttribute("srcObject");
  remoteVideo.current.removeAttribute("srcObject");

  // toggleCallButton.textContent = "Call";
  // toggleMuteButton.disabled = true;
}

// Handle any error related to the webcam or microphone
function handleGetUserMediaError(e) {
  switch (e.name) {
    case "NotFoundError":
      alert(
        "Unable to open your call because no camera and/or microphone were found."
      );
      break;

    case "SecurityError":
    case "PermissionDeniedError":
      // Do nothing; this is the same as the user canceling the call.
      break;

    default:
      alert("Error opening your camera and/or microphone: " + e.message);
      break;
  }

  endCall();
}

// Handle peer connection errors
function reportError(err) {
  console.log(`reportError: &{err}`);
}
