import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

import EndCallButton from "./EndCallButton";
import MuteButton from "./MuteButton";
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

const ControlsBar = ({ onButtonClick }) => {
  const variants = {
    visible: { opacity: 1, y: 0, transition: { type: "tween" } },
    hidden: { opacity: 0, y: barHeight, transition: { type: "tween" } }
  };

  const controls = useAnimation();

  useEffect(() => {
    let timeout;

    timeout = setTimeout(() => {
      window.addEventListener("mousemove", handleMouseMove);
      controls.start("hidden");
    }, 1000);

    const handleMouseMove = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      controls.start("visible");
      timeout = setTimeout(() => {
        window.addEventListener("mousemove", handleMouseMove);
        controls.start("hidden");
      }, 3000);
    };

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeout) clearTimeout(timeout);
    };
  });

  return (
    <Bar animate={controls} variants={variants}>
      <MuteButton onClick={() => onButtonClick("mute")} />
      <FlipButton onClick={() => onButtonClick("flip")} />
      <EndCallButton onClick={() => onButtonClick("end")} />
    </Bar>
  );
};

export default ControlsBar;
