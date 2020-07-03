function initWebSocket() {
  // const HOST_NAME = window.location.hostname;
  // let WEBSOCKET_SERVER;
  // if (HOST_NAME === "127.0.0.1" || HOST_NAME === "localhost")
  //   WEBSOCKET_SERVER = `ws://${HOST_NAME}:3001`;
  // else WEBSOCKET_SERVER = "wss://facecall-websocket-signaling.herokuapp.com/";

  const WEBSOCKET_SERVER = "wss://facecall-websocket-signaling.herokuapp.com/";

  const ws = new WebSocket(WEBSOCKET_SERVER);

  // WebSocket event listeners
  ws.addEventListener("open", e => {
    console.log(`Connected to WebSocket server ${e.target.url}`);
  });

  ws.addEventListener("close", e => {
    console.log(`Disconnected from WebSocket server ${e.target.url}`);
  });

  ws.addEventListener("message", ({ data }) => {
    const { type, userName, payload } = JSON.parse(data);

    console.log(`Data received from ${userName} via WebSocket server: ${type}`);
    console.table(payload);

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

export function sendToServer(ws, data) {
  ws.send(JSON.stringify(data));
}

export default initWebSocket;
