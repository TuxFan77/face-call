import styled from "styled-components";

import colors from "../constants/colors";

const Card = styled.div`
  width: 100%;
  margin: 3rem 0;
  background: ${colors.cardBackground};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  @media screen and (min-width: 992px) {
    width: 50%;
  }
`;

export default Card;
