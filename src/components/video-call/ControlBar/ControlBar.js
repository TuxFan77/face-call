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

const ControlBar = ({
  onButtonClick,
  onMouseEnter,
  onMouseLeave,
  visible,
  speakerMuted,
  micMuted
}) => {
  const variants = {
    visible: { opacity: 1, y: 0, transition: { type: "tween" } },
    hidden: { opacity: 0, y: barHeight, transition: { type: "tween" } }
  };

  const controls = useAnimation();

  useEffect(() => {
    controls.start(() => variants[visible]);
  }, [controls, variants, visible]);

  return (
    <Bar
      initial={"visible"}
      animate={controls}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={() => console.log("onTouchStart")}
      onTouchMove={() => console.log("onTouchMove")}
      onTouchEnd={() => console.log("onTouchEnd")}
    >
      <SpeakerButton
        onClick={() => onButtonClick("speaker")}
        speakerMuted={speakerMuted}
      />
      <MicButton onClick={() => onButtonClick("mic")} micMuted={micMuted} />
      <FlipButton onClick={() => onButtonClick("flip")} />
      <EndCallButton onClick={() => onButtonClick("end")} />
    </Bar>
  );
};

export default ControlBar;
