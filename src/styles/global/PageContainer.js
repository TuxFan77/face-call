import styled from "styled-components";

import Container from "./SiteContainer";

const PageContainer = styled(Container)`
  position: absolute;
  top: 0;
  @media screen and (min-width: 992px) {
    position: static;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default PageContainer;
