import styled from "styled-components";

import { primaryGradient, primaryFontColor } from "../constants/colors";
import { mainFontFamily, primaryFontSize } from "../constants/fonts";

const LargeButton = styled.button`
  background: ${primaryGradient};
  border: none;
  padding: 0.15em 0;
  font-size: ${primaryFontSize};
  font-family: ${mainFontFamily};
  color: ${primaryFontColor};
  width: 100%;
`;

export default LargeButton;
