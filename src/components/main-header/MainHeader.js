import React from "react";

import Container from "../../styles/global/Container";
import { Header, BrandLogo } from "./MainHeader.styled";

const MainHeader = () => {
  return (
    <Header>
      <Container>
        <BrandLogo>FaceCall.app</BrandLogo>
      </Container>
    </Header>
  );
};

export default MainHeader;
