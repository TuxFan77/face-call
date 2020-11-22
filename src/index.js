import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import { inspect } from "@xstate/inspect";
// adapter.js fixes cross-browser WebRTC inconsistencies
// eslint-disable-next-line
import adapter from "webrtc-adapter";

import App from "./components/App";
import "./index.css";

// inspect({
//   url: "https://statecharts.io/inspect",
//   iframe: false,
// });

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
