import React from "react";
import styled from "styled-components";

import { mainFontFamily } from "../../styles/fonts";

export const Input = props => {
  return <StyledInput {...props}>{props.children}</StyledInput>;
};

Input.defaultProps = {
  autoFocus: true,
  autoComplete: "off",
  spellCheck: false,
};

export default Input;

const StyledInput = styled.input`
  border-radius: 9999px;
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  font-size: 1.5rem;
  font-family: ${mainFontFamily};
  padding: 0.5rem 1.5rem;

  &:focus {
    outline-style: none;
  }
`;
