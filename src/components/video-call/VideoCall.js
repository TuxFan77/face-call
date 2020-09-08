import Signaling from "../../communication/signaling";
import getIceServers from "../../communication/getIceServers";

function VideoCall(localVideo, remoteVideo, room, logging = false) {
  this.onFacingMode = null;
  this.onEndCallReceived = null;
  const cameras = [];
  let currentCamera = 0;
  let peerConnection = null;
  let signaling;

  // Starts a video call
  this.start = async function () {
    try {
      await initLocalVideo();
      await getCameras();

      signaling = new Signaling();

      signaling.onJoinRoom = async result => {
        console.log("onJoinRoom:", result);
        if (!result) {
          console.log("room full... aborting call");
          signaling.disconnect();
          return;
        }
        signaling.onOffer = handleVideoOfferMessage;
        signaling.onAnswer = handleVideoAnswerMessage;
        signaling.onCandidate = handleNewRemoteICECandidate;
        signaling.onEndCall = this.endCall;

        startCall();
      };

      signaling.joinRoom(room);
    } catch (err) {
      log(err);
    }
  };

  // Initialize the local video DOM element with the webcam feed
  const initLocalVideo = async () => {
    log("initLocalVideo");
    const stream = await getMediaStream();
    this.onFacingMode(getFacingMode(stream.getVideoTracks()[0]));
    localVideo.current.srcObject = stream;
    localVideo.current.play();
  };

  // Enumerates the cameras on the device and adds them to the cameras array
  function getCameras() {
    log("getCameras");
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
  this.switchCameras = async () => {
    if (!peerConnection) return;
    if (cameras.length < 2) {
      log("Only one camera detected on this device");
      return;
    }

    currentCamera = ++currentCamera % cameras.length;

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: {
            exact: cameras[currentCamera].deviceId,
          },
        },
      });

      const oldVideoTrack = localVideo.current.srcObject.getVideoTracks()[0];
      const newVideoTrack = newStream.getVideoTracks()[0];
      this.onFacingMode(getFacingMode(newVideoTrack));
      localVideo.current.srcObject.addTrack(newVideoTrack);
      localVideo.current.srcObject.removeTrack(oldVideoTrack);
      oldVideoTrack.stop();
      await getVideoTrack(peerConnection).replaceTrack(newVideoTrack);
    } catch (error) {
      log(error);
    }
  };

  // Gets the facing mode of the passed in video track.
  // Returns an empty string if the facing mode isn't on the track.
  function getFacingMode(track) {
    const settings = track.getSettings();
    if (settings.facingMode) return settings.facingMode;
    return "";
  }

  // Returns the video track of an RTCPeerConnection object
  function getVideoTrack(pc) {
    return pc.getSenders().find(sender => sender.track.kind === "video");
  }

  // Gets the media stream
  async function getMediaStream() {
    log("getMediaStream");

    const { platform } = navigator;
    log(`platform: ${platform}`);

    const constraints = { audio: true };

    if (platform && ["iPhone", "iPad", "iPod"].includes(platform)) {
      constraints.video = true;
    } else {
      constraints.video = {
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
      };
    }

    return await navigator.mediaDevices.getUserMedia(constraints);
  }

  // Start a video call
  // This function is called if we're the peer that's initiaiting the call
  async function startCall() {
    log("startCall");

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
      log(error);
    }
  }

  // Handles the negotiationneeded event on the peerConnection object
  // Fires when tracks are added to the peerConnection that initiated the call
  async function handleNegotiationNeeded() {
    log("handleNegotiationNeeded");

    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      signaling.sendOffer(offer);
    } catch (error) {
      log(error);
    }
  }

  // Handles incoming video offer message over the web socket connection
  // Fires if we're the callee and we receive an offer from the caller
  async function handleVideoOfferMessage(offer) {
    log("handleVideoOfferMessage");

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
      signaling.sendAnswer(answer);
    } catch (error) {
      log(error);
    }
  }

  // Handles incoming video answer message over the web socket connection
  // Fires if we're the caller and we're receiving an answer to our offer
  async function handleVideoAnswerMessage(answer) {
    log("handleVideoAnswerMessage");

    try {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    } catch (error) {
      log(error);
    }
  }

  // Handles incoming tracks from the remote peer
  // Adds the tracks to the remote video player
  // Fires when remote tracks come in
  const handleAddTrack = e => {
    log("handleAddTrack");
    if (remoteVideo.current.srcObject) return;
    remoteVideo.current.srcObject = e.streams[0];
  };

  // Sends locally generated ICE candidates to the remote peer
  function handleNewLocalICECandidate(e) {
    log("handleNewLocalICECandidate");
    if (!e.candidate) {
      log("NO LOCAL CANDIDATE");
      return;
    }
    signaling.sendCandidate(e.candidate);
  }

  // Receives ICE candidates from the remote peer
  // and adds them to the local peer connection
  async function handleNewRemoteICECandidate(candidate) {
    log("handleNewRemoteICECandidate");
    if (!peerConnection) {
      log("NO REMOTE CANDIDATE");
      return;
    }
    try {
      await peerConnection.addIceCandidate(candidate);
    } catch (error) {
      log(error);
    }
  }

  // Enables / disables the local audio track
  this.isMicMuted = state => {
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
    log("endCall");

    this.onEndCallReceived();
    signaling.endCall();

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
  };

  function log(message) {
    if (!logging) return;
    const timestamp = Date.now();
    console.log(`${timestamp}: ${message}`);
  }
}

export default VideoCall;
