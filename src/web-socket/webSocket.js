function initWebSocket() {
  const WEBSOCKET_SERVER = "wss://facecall-websocket-signaling.herokuapp.com/";

  const ws = new WebSocket(WEBSOCKET_SERVER);

  // WebSocket event listeners
  ws.addEventListener("open", e => {
    console.log(`Connected to WebSocket server ${e.target.url}`);
  });

  ws.addEventListener("message", ({ data }) => {
    const { type, userName, payload } = JSON.parse(data);

    console.log(`Data received from ${userName} via WebSocket server: ${type}`);
    // console.table(payload);

    switch (type) {
      case "video-offer":
        // handleVideoOfferMessage(payload);
        break;

      case "video-answer":
        // handleVideoAnswerMessage(payload);
        break;

      case "new-ice-candidate":
        // handleNewICECandidate(payload);
        break;

      case "end-call":
        // if (localPeerConnection) endCall();
        break;

      default:
        break;
    }
  });

  return ws;
}

export default initWebSocket;
