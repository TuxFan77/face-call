import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

import EndCallButton from "./EndCallButton";
import MicButton from "./MicButton";
import SpeakerButton from "./SpeakerButton";
import FlipButton from "./FlipButton";

const barHeight = "6rem";

const Bar = styled(motion.div)`
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90vw;
  @media screen and (min-width: 768px) {
    width: 40vw;
  }
  bottom: 0;
  height: ${barHeight};
  border-radius: 0.75rem 0.75rem 0 0;
  background: rgba(255, 255, 255, 0.2);
`;

const ControlBar = ({ onButtonClick, remoteVideoRef }) => {
  const variants = {
    visible: { opacity: 1, y: 0, transition: { type: "tween" } },
    hidden: { opacity: 0, y: barHeight, transition: { type: "tween" } }
  };

  const controls = useAnimation();

  useEffect(() => {
    // When the user moves the mouse or touches the screen on the remote video
    // element, show the controls bar for a few seconds.
    const { current } = remoteVideoRef;

    let timeout;

    timeout = setTimeout(() => {
      current.addEventListener("mousemove", handleMouseMove);
      controls.start("hidden");
    }, 1000);

    const handleMouseMove = () => {
      current.removeEventListener("mousemove", handleMouseMove);
      controls.start("visible");
      timeout = setTimeout(() => {
        current.addEventListener("mousemove", handleMouseMove);
        controls.start("hidden");
      }, 3000);
    };

    return () => {
      current.removeEventListener("mousemove", handleMouseMove);
      if (timeout) clearTimeout(timeout);
    };
  }, [controls, remoteVideoRef]);

  return (
    <Bar animate={controls} variants={variants}>
      <SpeakerButton onClick={() => onButtonClick("speaker")} />
      <MicButton onClick={() => onButtonClick("mic")} />
      <FlipButton onClick={() => onButtonClick("flip")} />
      <EndCallButton onClick={() => onButtonClick("end")} />
    </Bar>
  );
};

export default ControlBar;
