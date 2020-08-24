import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import colors from "../../styles/colors";
import Container from "../common/SiteContainer";
import { mainHeaderHeight } from "../../styles/sizes";
import { primaryFontSize } from "../../styles/fonts";

const MainHeader = () => {
  return (
    <Header>
      <Container>
        <BrandLink to="/">FaceCall</BrandLink>
      </Container>
    </Header>
  );
};

const Header = styled.header`
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  height: ${mainHeaderHeight};
  background: ${colors.primaryGradient};
  color: ${colors.primaryFont};
  font-size: ${primaryFontSize};
`;

const BrandLink = styled(Link)`
  &:active,
  &:visited {
    color: ${colors.primaryFont};
  }
`;

export default MainHeader;
