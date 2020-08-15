import styled from "styled-components";
import { Link } from "react-router-dom";

import colors from "../constants/colors";
import { mainFontFamily, primaryFontSize } from "../constants/fonts";

const Button = styled(Link)`
  background: ${colors.primaryGradient};
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  cursor: pointer;
  padding: 0.15em 0;
  font-size: ${primaryFontSize};
  font-family: ${mainFontFamily};
  color: ${colors.primaryFont};
  width: 100%;

  &:focus {
    outline-style: dotted;
  }

  &:active,
  &:visited {
    color: ${colors.primaryFont};
  }
`;

export default Button;
