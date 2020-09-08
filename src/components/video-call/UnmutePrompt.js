import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

import colors from "../../styles/colors";

const Overlay = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5));
  width: 100%;
  height: 100%;
`;

const Caption = styled(motion.p)`
  color: ${colors.white};
  margin: 1rem;
`;

const UnmutePrompt = ({ visible, onClick }) => {
  return (
    <AnimatePresence>
      {visible && (
        <Overlay
          key="unmutePrompt"
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <Caption
            key="unmuteCaption"
            exit={{ y: -50, transition: { type: "easeInOut", duration: 0.6 } }}
            onClick={onClick}
          >
            Tap to unmute
          </Caption>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default UnmutePrompt;
