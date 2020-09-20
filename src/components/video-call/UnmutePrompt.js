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
  background: radial-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1));
  width: 100%;
  height: 100%;
`;

const Container = styled(motion.div)`
  cursor: pointer;
  z-index: 1;
`;
const IconContainer = styled.div`
  width: 16rem;
  height: 16rem;
  margin-bottom: -3rem;
`;

const Caption = styled(motion.p)`
  color: ${colors.white};
  text-align: center;
  margin: 1rem;
`;

const UnmutePrompt = ({ visible, onClick }) => {
  const duration = 0.3;
  const type = "easeInOut";
  return (
    <AnimatePresence>
      {visible && (
        <Overlay
          key="unmute-overlay"
          initial={{ opacity: 0, transition: { duration } }}
          animate={{ opacity: 1, transition: { duration } }}
          exit={{ opacity: 0, transition: { duration } }}
        >
          <Container
            key="unmute-icon"
            initial={{ y: 0, opacity: 0, transition: { duration } }}
            animate={{ y: 0, opacity: 1, transition: { duration } }}
            exit={{ y: -25, opacity: 0, transition: { type, duration } }}
            onClick={e => {
              e.preventDefault();
              onClick("UNMUTE");
            }}
          >
            <IconContainer>
              <SpeakerIcon />
            </IconContainer>
            <Caption>Tap to unmute</Caption>
          </Container>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default UnmutePrompt;
