import styled from "styled-components";

import { cardBackgroundColor } from "../constants/colors";

const Card = styled.div`
  background: ${cardBackgroundColor};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  ${props => (props.width ? `width: ${props.width};` : "")}
  ${props => (props.height ? `height: ${props.height};` : "")}
`;

export default Card;
