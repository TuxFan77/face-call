import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

const Video = styled(motion.video)`
  position: absolute;
  width: 20vw;
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
  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 }
  };
  const controls = useAnimation();
  const constraints = useRef(null);
  return (
    <DragConstraints ref={constraints}>
      <Video
        autoPlay
        playsInline
        muted
        initial="hidden"
        animate={controls}
        variants={variants}
        drag
        dragConstraints={constraints}
        ref={ref}
        onPlay={() => controls.start("visible")}
      />
    </DragConstraints>
  );
});

export default LocalVideo;
