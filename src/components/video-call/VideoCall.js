import {
  initWebSocket,
  sendToServer,
  closeWebSocket
} from "../../web-socket/webSocket";
import getIceServers from "../../web-rtc/getIceServers";

import { v4 as uuidv4 } from "uuid";

function VideoCall(localVideo, remoteVideo) {
  this.role = "";
  this.setLocalVideoVisibility = null;
  const cameras = [];
  let currentCamera = 0;
  let peerConnection = null;
  const userId = uuidv4();

  // Starts a video call
  this.start = async function () {
    try {
      await initLocalVideo();
      await getCameras();
      await initWebSocket(
        handleVideoOfferMessage,
        handleVideoAnswerMessage,
        handleNewRemoteICECandidate,
        this.endCall
      );

      sendToServer({
        type: "set-user-id",
        userId
      });

      if (this.role === "caller") startCall();
    } catch (err) {
      console.log(err);
    }
  };

  // Initialize the local video DOM element with the webcam feed
  const initLocalVideo = async () => {
    console.log("initLocalVideo");
    const stream = await getMediaStream();
    localVideo.current.srcObject = stream;
    localVideo.current.play();
    if (this.setLocalVideoVisibility) this.setLocalVideoVisibility("visible");
  };

  // Enumerates the cameras on the device and adds them to the cameras array
  function getCameras() {
    console.log("getCameras");
    return navigator.mediaDevices
      .enumerateDevices()
      .then(devices => {
        devices.forEach(device => {
          if (device.kind === "videoinput") {
            cameras.push(device);
          }
        });
      })
      .catch(err => err);
  }

  // Cycles through the available cameras on the device
  this.switchCameras = () => {
    if (cameras.length < 2) {
      console.log("Only one camera");
      return;
    }

    currentCamera = ++currentCamera % cameras.length;
    console.log(cameras[currentCamera]);
  };

  // Gets the media stream
  async function getMediaStream() {
    console.log("getMediaStream");

    const { platform } = navigator;
    console.log(`platform: ${platform}`);

    const constraints = { audio: true };

    if (platform && ["iPhone", "iPad", "iPod"].includes(platform)) {
      constraints.video = true;
    } else {
      constraints.video = {
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 }
      };
    }

    return await navigator.mediaDevices.getUserMedia(constraints);
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

      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
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

  // Enables / disables the local audio track
  this.micMuted = state => {
    if (localVideo.current.srcObject) {
      localVideo.current.srcObject.getTracks().forEach(track => {
        if (track.kind === "audio") {
          track.enabled = !state;
        }
      });
    }
  };

  // End the call and cleans up resources
  this.endCall = () => {
    console.log("endCall");

    if (this.setLocalVideoVisibility) this.setLocalVideoVisibility("hidden");

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
      remoteVideo.current.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.current.removeAttribute("src");
      remoteVideo.current.removeAttribute("srcObject");
    }

    peerConnection = null;
  };
}

export default VideoCall;
