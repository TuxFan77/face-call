import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  cursor: pointer;
  & > * {
    pointer-events: none;
  }
`;

const ButtonWrapper = ({ event, title, children }) => {
  return (
    <Wrapper data-event={event} title={title}>
      {children}
    </Wrapper>
  );
};

export default ButtonWrapper;
