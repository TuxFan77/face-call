import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

const Video = styled(motion.video)`
  position: absolute;
  height: 20vh;
  right: 2vw;
  top: 2vw;
  background: black;
  border-radius: 0.75rem;
  border: 1.5px solid darkgrey;
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
    visible: { opacity: 1, scale: 1, rotateY: 180 },
    hidden: { opacity: 0, scale: 0, rotateY: 180 }
  };
  const controls = useAnimation();
  const constraints = useRef(null);

  useEffect(() => {
    // Explicitly set the "muted" attribute on the DOM element so Safari will autoplay
    ref.current.setAttribute("muted", "true");
  });

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
        onPlay={() => {
          controls.start("visible");
          console.log("LocalVideo onPlay");
        }}
        onPause={() => {
          controls.start("hidden");
          console.log("LocalVideo onPause");
        }}
      />
    </DragConstraints>
  );
});

export default LocalVideo;
