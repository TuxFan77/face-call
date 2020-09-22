import React from "react";
// import { motion } from "framer-motion";
// import styled from "styled-components";

import Container from "./Container";
import Caption from "./Caption";
import IconContainer from "./IconContainer";
import { ReactComponent as SpeakerOff } from "../../../images/speaker-off-overlay.svg";

const SpeakerStatus = ({ visible, state }) => {
  return (
    <>
      {visible && (
        <Container>
          <IconContainer>
            <SpeakerOff />
          </IconContainer>
          <Caption>Speaker muted</Caption>
        </Container>
      )}
    </>
  );
};

export default SpeakerStatus;
