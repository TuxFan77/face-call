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
  @media screen and (min-width: 1025px) {
    width: 50vw;
  }
  bottom: 0;
  height: ${barHeight};
  border-radius: 0.75rem 0.75rem 0 0;
  background: rgba(255, 255, 255, 0.2);
`;

const ControlBar = ({
  onButtonClick,
  onMouseEnter,
  onMouseLeave,
  visible,
  isSpeakerMuted,
  isMicMuted,
}) => {
  const variants = {
    visible: { opacity: 1, y: 0, transition: { type: "tween" } },
    hidden: { opacity: 0, y: barHeight, transition: { type: "tween" } },
  };

  const controls = useAnimation();

  useEffect(() => {
    controls.start(() => variants[visible ? "visible" : "hidden"]);
  }, [controls, variants, visible]);

  return (
    <Bar
      initial={"visible"}
      animate={controls}
      onTouchEnd={e => {
        e.preventDefault();
        onButtonClick(e.target.dataset.button);
      }}
      onClick={e => onButtonClick(e.target.dataset.button)}
      onContextMenu={e => e.preventDefault()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <SpeakerButton isSpeakerMuted={isSpeakerMuted} />
      <MicButton isMicMuted={isMicMuted} />
      <FlipButton />
      <EndCallButton />
    </Bar>
  );
};

export default ControlBar;
