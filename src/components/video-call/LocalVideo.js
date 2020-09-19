import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

const Video = styled(motion.video)`
  position: absolute;
  height: 20vh;
  right: 0;
  top: 0;
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
        // delay: 1,
        duration: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      scale: 0,
      rotateY: 180,
      transition: { duration: 0.3 },
    },
    user: {
      rotateY: 180,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    environment: {
      rotateY: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };
  const controls = useAnimation();
  const constraints = useRef(null);

  // Explicitly set the "muted" attribute on the DOM element so Safari will autoplay
  useEffect(() => ref.current.setAttribute("muted", ""), [ref]);

  // Show or hide the local video
  useEffect(() => {
    controls.start(() => variants[visible ? "visible" : "hidden"]);
  }, [controls, variants, visible]);

  // Mirror / unmirror local video depending on if it's the user facing camera or not
  useEffect(() => {
    controls.start(() => (facingMode ? variants[facingMode] : variants.user));
  }, [controls, variants, facingMode]);

  return (
    <DragConstraints ref={constraints}>
      <Video
        autoPlay
        playsInline
        muted
        id="localVideo"
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
