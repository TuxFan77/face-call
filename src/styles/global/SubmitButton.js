import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { primaryGradient, primaryFontColor } from "../constants/colors";
import { mainFontFamily, primaryFontSize } from "../constants/fonts";

const Button = styled(motion.input)`
  background: ${primaryGradient};
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  cursor: pointer;
  padding: 0.15em 0;
  font-size: ${primaryFontSize};
  font-family: ${mainFontFamily};
  color: ${primaryFontColor};
  width: 100%;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  &:focus {
    outline-style: dotted;
  }

  &:active,
  &:visited {
    color: ${primaryFontColor};
  }
`;

const SubmitButton = props => {
  const variants = {
    active: { opacity: 1 },
    disabled: { opacity: 0.4 }
  };

  return (
    <Button
      variants={variants}
      animate={props.disabled ? "disabled" : "active"}
      {...props}
    />
  );
};

export default SubmitButton;
