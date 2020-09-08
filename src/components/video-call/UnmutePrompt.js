import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

import colors from "../../styles/colors";
import { ReactComponent as SpeakerIcon } from "../../images/speaker-off-overlay.svg";

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
  text-align: center;
  margin: 1rem;
`;

const UnmutePrompt = ({ visible, onClick }) => {
  return (
    <AnimatePresence>
      {visible && (
        <Overlay
          key="overlay"
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <motion.div
            key="icon"
            exit={{ y: -50, transition: { type: "easeInOut", duration: 0.6 } }}
            onClick={onClick}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{ width: "16rem", height: "16rem", marginBottom: "-3rem" }}
            >
              <SpeakerIcon />
            </div>
            <Caption>Tap to unmute</Caption>
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default UnmutePrompt;
