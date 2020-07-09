let ws;

export function initWebSocket(
  handleVideoOfferMessage,
  handleVideoAnswerMessage,
  handleNewRemoteICECandidate,
  endCall
) {
  const WEBSOCKET_SERVER = "wss://facecall-websocket-signaling.herokuapp.com/";

  // Connect to the server
  ws = new WebSocket(WEBSOCKET_SERVER);

  // WebSocket event listeners
  ws.addEventListener("close", e => {
    console.log(`Disconnected from WebSocket server ${e.target.url}`);
  });

  ws.addEventListener("message", ({ data }) => {
    const { type, userId, payload } = JSON.parse(data);

    console.log(`Data received from ${userId} via WebSocket server: ${type}`);
    // console.table(payload);

    switch (type) {
      case "video-offer":
        handleVideoOfferMessage(payload);
        break;

      case "video-answer":
        handleVideoAnswerMessage(payload);
        break;

      case "new-ice-candidate":
        handleNewRemoteICECandidate(payload);
        break;

      case "end-call":
        endCall();
        break;

      default:
        break;
    }
  });

  // Return a promise that will resolve to the WebSocket object
  return new Promise((resolve, reject) => {
    ws.onopen = e => {
      console.log(`Connected to WebSocket server ${e.target.url}`);
      resolve(ws);
    };
    ws.onerror = err => {
      console.log(`Error connecting to WebSocket server ${err}`);
      reject(err);
    };
  });
}

// Helper function to serialize and send data to the web socket server
export function sendToServer(data) {
  if (ws && ws.readyState === ws.OPEN) ws.send(JSON.stringify(data));
}

// Closes the web socket connection
export function closeWebSocket() {
  if (ws && (ws.readyState === ws.CONNECTING || ws.readyState === ws.OPEN))
    ws.close();
}
