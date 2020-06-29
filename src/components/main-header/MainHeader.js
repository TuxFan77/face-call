import React from "react";

import Container from "../../styles/global/SiteContainer";
import { Header, BrandLink } from "./MainHeaderStyles";

const MainHeader = () => {
  return (
    <Header>
      <Container>
        <BrandLink to="/">FaceCall.app</BrandLink>
      </Container>
    </Header>
  );
};

export default MainHeader;
