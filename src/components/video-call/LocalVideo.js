import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Video = styled(motion.video)`
  position: absolute;
  right: 2vw;
  bottom: 2vw;
  background: black;
  border: 2px solid darkgrey;
  cursor: move;
  pointer-events: auto;
`;

const DragConstraints = styled(motion.div)`
  position: fixed;
  z-index: 10;
  pointer-events: none;
  top: 2vw;
  bottom: 2vw;
  left: 2vw;
  right: 2vw;
`;

const LocalVideo = React.forwardRef((props, ref) => {
  const constraints = useRef(null);
  return (
    <DragConstraints ref={constraints}>
      <Video
        height={window.screen.height * 0.2}
        width={window.screen.width * 0.2}
        autoPlay
        playsInline
        muted
        drag
        dragConstraints={constraints}
        ref={ref}
        onPlay={props.handleStartPlayback}
      />
    </DragConstraints>
  );
});

export default LocalVideo;
