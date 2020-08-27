import io from "socket.io-client";
const SIGNALING_SERVER_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : "https://webrtc-socketio-signaling.herokuapp.com/";

function Signaling(url = SIGNALING_SERVER_URL) {
  const socket = io(url);

  this.onOffer = null;
  this.onAnswer = null;
  this.onCandidate = null;
  this.onEndCall = null;

  socket.on("connect", () => {
    console.log(
      socket.id,
      `connected to signaling server ${SIGNALING_SERVER_URL}`
    );

    socket.on("video-offer", offer => {
      this.onOffer(offer);
    });

    socket.on("video-answer", answer => {
      this.onAnswer(answer);
    });

    socket.on("candidate", candidate => {
      this.onCandidate(candidate);
    });

    socket.on("end-call", () => {
      this.onEndCall();
      socket.disconnect();
    });
  });

  this.sendOffer = offer => {
    socket.emit("video-offer", offer);
  };

  this.sendAnswer = answer => {
    socket.emit("video-answer", answer);
  };

  this.sendCandidate = candidate => {
    socket.emit("candidate", candidate);
  };

  this.joinRoom = room => {
    socket.emit("join-room", room);
  };

  this.endCall = () => {
    socket.emit("end-call");
    socket.disconnect();
  };
}

export default Signaling;
