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
  const { visible, facingMode } = props;

  const variants = {
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 180,
      transition: {
        delay: 1,
        duration: 0.3
      }
    },
    hidden: {
      opacity: 0,
      scale: 0,
      rotateY: 180,
      transition: { duration: 0.3 }
    }
  };
  const controls = useAnimation();
  const constraints = useRef(null);

  // Explicitly set the "muted" attribute on the DOM element so Safari will autoplay
  useEffect(() => ref.current.setAttribute("muted", "true"), [ref]);

  useEffect(() => {
    controls.start(() => variants[visible]);
    console.log("LocalVideo facingMode: ", facingMode);
  }, [controls, variants, visible, facingMode]);

  return (
    <DragConstraints ref={constraints}>
      <Video
        autoPlay
        playsInline
        muted
        initial={"hidden"}
        animate={controls}
        variants={variants}
        drag
        dragConstraints={constraints}
        ref={ref}
      />
    </DragConstraints>
  );
});

export default LocalVideo;
