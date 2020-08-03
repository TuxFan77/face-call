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

const ButtonWrapper = ({ buttonType, children }) => {
  return <Wrapper data-button={buttonType}>{children}</Wrapper>;
};

export default ButtonWrapper;
