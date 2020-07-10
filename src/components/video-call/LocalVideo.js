import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Video = styled(motion.video)`
  position: absolute;
  height: 15vh;
  right: 1vw;
  bottom: 1vw;
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
