import styled from "styled-components";
import { Link } from "react-router-dom";

import { mainHeaderHeight } from "../../styles/constants/sizes";
import {
  primaryGradient,
  primaryFontColor
} from "../../styles/constants/colors";
import { primaryFontSize } from "../../styles/constants/fonts";

export const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  height: ${mainHeaderHeight};
  background: ${primaryGradient};
  color: ${primaryFontColor};
  font-size: ${primaryFontSize};
`;

export const BrandLink = styled(Link)`
  &:active,
  &:visited {
    color: ${primaryFontColor};
  }
`;
