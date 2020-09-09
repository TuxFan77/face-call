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
  return (
    <AnimatePresence>
      {visible && (
        <Overlay
          key="unmute-overlay"
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <Container
            key="unmute-icon"
            exit={{ y: -25, transition: { type: "easeInOut", duration: 0.3 } }}
            onClick={onClick}
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
