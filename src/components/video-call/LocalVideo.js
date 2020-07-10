import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Video = styled(motion.video)`
  position: absolute;
  z-index: 10;
  height: 20vh;
  right: 2vw;
  bottom: 2vw;
  background: black;
  border: 2px solid darkgrey;
  cursor: move;
`;

const LocalVideo = React.forwardRef((props, ref) => {
  return (
    <Video
      autoPlay
      playsInline
      muted
      drag
      dragMomentum={false}
      ref={ref}
      onPlay={props.handleStartPlayback}
    />
  );
});

export default LocalVideo;
