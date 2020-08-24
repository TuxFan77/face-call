import React from "react";
import styled from "styled-components";

import colors from "../../styles/constants/colors";
import {
  bulletDiameter,
  listMarginTopBottom,
  listFontSize,
} from "../../styles/constants/sizes";
import Button from "../common/LinkButton";

const HomeDescription = () => {
  return (
    <DescriptionContainer>
      <h1>Video calling in your web browser</h1>
      <List>
        <li>No install</li>
        <li>No signup</li>
        <li>Free to use</li>
      </List>

      <Button to="/enterName">Get Started</Button>
    </DescriptionContainer>
  );
};

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
        background-color: ${colors.accent};
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

export default HomeDescription;
