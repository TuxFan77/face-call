import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// adapter.js fixes cross-browser WebRTC inconsistencies
// eslint-disable-next-line
import adapter from "webrtc-adapter";

import App from "./components/App";
import "./index.css";

// Conditionally loads remote debugging script
if (window.location.search.indexOf("remote-debug") >= 0) {
  (function () {
    var s = document.createElement("script");
    s.src = "https://remotejs.com/agent/agent.js";
    s.setAttribute("data-consolejs-channel", "facecallapp");
    document.head.appendChild(s);
  })();
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
