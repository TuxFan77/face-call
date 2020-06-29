import styled from "styled-components";

import { accentColor } from "../../styles/constants/colors";
import {
  bulletDiameter,
  listMarginTopBottom,
  listFontSize
} from "../../styles/constants/sizes";

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.alignLeft ? "flex-start" : "center")};
  justify-content: space-between;

  h1 {
    text-align: center;
  }
`;

export const List = styled.ul`
  text-align: center;

  li {
    margin: ${listMarginTopBottom} 0;
    font-size: ${listFontSize};

    &:nth-of-type(2) {
      position: relative;
      &::before,
      &::after {
        content: "";
        height: ${bulletDiameter};
        width: ${bulletDiameter};
        border-radius: 50%;
        background-color: ${accentColor};
        display: block;
        position: absolute;
        left: calc(50% - ${bulletDiameter} / 2);
      }
      &::before {
        top: calc(-${listMarginTopBottom} / 2 - ${bulletDiameter} / 2);
      }
      &::after {
        bottom: calc(-${listMarginTopBottom} / 2 - ${bulletDiameter} / 2);
      }
    }
  }
`;
