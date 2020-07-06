// const HOST_NAME = window.location.hostname;
// let WEBSOCKET_SERVER;
// if (HOST_NAME === "127.0.0.1" || HOST_NAME === "localhost")
//   WEBSOCKET_SERVER = `ws://${HOST_NAME}:3001`;
// else WEBSOCKET_SERVER = "wss://facecall-websocket-signaling.herokuapp.com/";

let ws;

function initWebSocket(
  handleVideoOfferMessage,
  handleVideoAnswerMessage,
  handleNewICECandidate,
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
    console.table(payload);

    switch (type) {
      case "video-offer":
        handleVideoOfferMessage(payload);
        break;

      case "video-answer":
        handleVideoAnswerMessage(payload);
        break;

      case "new-ice-candidate":
        handleNewICECandidate(payload);
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
    ws.onopen = () => {
      resolve(ws);
    };
    ws.onerror = err => {
      reject(err);
    };
  });
}

export function sendToServer(data) {
  ws.send(JSON.stringify(data));
}

export default initWebSocket;
