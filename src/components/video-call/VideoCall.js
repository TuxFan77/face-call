import React, { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import VideoPageContainer from "./VideoPageContainer";
import LocalVideo from "./LocalVideo";
import ControlsBar from "./ControlsBar/ControlsBar";
import RemoteVideo from "./RemoteVideo";
import { useQuery } from "../../hooks/hooks";
import getMediaStream from "../../utils/getMediaStream";
import {
  videoPageVariants,
  pageTransition
} from "../../animation/pageTransition";
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
  let isCaller = useRef(false);
  const cameras = useRef([]);
  localVideo = useRef(null);
  remoteVideo = useRef(null);

  const query = useQuery();
  if (query.has("isCaller")) {
    if (query.get("isCaller") === "true") {
      isCaller.current = true;
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await initLocalVideo();
        const cameraList = await getCameras();
        cameraList.forEach(camera => cameras.current.push(camera));

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
    return () => endCall();
  }, []);

  const handleControlsBarButtonClick = button => {
    switch (button) {
      case "speaker":
        remoteVideo.current.muted = !remoteVideo.current.muted;
        console.log(`remoteVideo.current.muted=${remoteVideo.current.muted}`);
        break;

      case "mic":
        console.log("toggle mic");
        break;

      case "flip":
        console.log("toggle flip");
        break;

      case "end":
        console.log("end call button clicked");
        endCall();
        break;

      default:
        break;
    }
  };

  return (
    <VideoPageContainer
      initial="in"
      animate="normal"
      exit="out"
      variants={videoPageVariants}
      transition={pageTransition}
    >
      <RemoteVideo ref={remoteVideo} />
      <LocalVideo ref={localVideo} />
      <ControlsBar
        onButtonClick={handleControlsBarButtonClick}
        remoteVideoRef={remoteVideo}
      />
    </VideoPageContainer>
  );
};

export default VideoCall;

// Initialize the local video element with the webcam feed
async function initLocalVideo() {
  console.log("initLocalVideo");
  const stream = await getMediaStream();
  console.log(stream);
  localVideo.current.srcObject = stream;
  localVideo.current.play();
}

// Returns an array of camera device labels
function getCameras() {
  console.log("getCameras");
  const deviceLabels = [];
  return navigator.mediaDevices
    .enumerateDevices()
    .then(devices => {
      devices.forEach(device => {
        if (device.kind === "videoinput") {
          deviceLabels.push(device.label);
        }
      });
      return deviceLabels;
    })
    .catch(err => err);
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
  console.log(e);
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
    console.log(error.name, error.message);
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
    localVideo.current.pause();
    localVideo.current.srcObject.getTracks().forEach(track => track.stop());
    localVideo.current.removeAttribute("src");
    localVideo.current.removeAttribute("srcObject");
  }

  if (remoteVideo.current.srcObject) {
    // remoteVideo.current.pause();
    remoteVideo.current.srcObject.getTracks().forEach(track => track.stop());
    remoteVideo.current.removeAttribute("src");
    remoteVideo.current.removeAttribute("srcObject");
  }

  peerConnection = null;
}
