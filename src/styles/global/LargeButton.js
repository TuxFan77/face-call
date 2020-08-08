import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { primaryGradient, primaryFontColor } from "../constants/colors";
import { mainFontFamily, primaryFontSize } from "../constants/fonts";

const StyledLink = styled(Link)`
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

  &:focus {
    outline-style: dotted;
  }

  &:active,
  &:visited {
    color: ${primaryFontColor};
  }
`;

const LargeButton = React.forwardRef((props, ref) => {
  // Emulate button behaviour by triggering a click on spacebar press
  function handleKeyUp(e) {
    if (e.keyCode === 32) ref.current.click();
  }

  return (
    <StyledLink ref={ref} {...props} onKeyUp={handleKeyUp}>
      {props.children}
    </StyledLink>
  );
});

export default LargeButton;
