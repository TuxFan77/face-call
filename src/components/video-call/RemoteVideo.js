import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

const Video = styled(motion.video)`
  @media screen and (orientation: landscape) {
    height: 100%;
  }
  @media screen and (orientation: portrait) {
    width: 100%;
  }
  background: black;
`;

const RemoteVideo = React.forwardRef((props, ref) => {
  const { visible } = props;

  const variants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1
    }
  };

  const controls = useAnimation();

  // Explicitly set the "muted" attribute on the DOM element so Safari will autoplay
  useEffect(() => ref.current.setAttribute("muted", "true"), [ref]);

  useEffect(() => {
    console.log(visible);
    controls.start(visible);
  }, [controls, visible]);

  return (
    <Video
      initial={"hidden"}
      animate={controls}
      variants={variants}
      autoPlay
      playsInline
      muted
      ref={ref}
    />
  );
});

export default RemoteVideo;
