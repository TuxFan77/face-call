let localPeerConnection;

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

// Peer connection event handlers
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
        userName,
        payload: localPeerConnection.localDescription
      });
    })
    .catch(err => reportError(err));
}
