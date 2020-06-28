import styled from "styled-components";

import Container from "./Container";
import { mainHeaderHeight } from "../constants/sizes";

const PageContainer = styled(Container)`
  display: flex;
  position: absolute;
  top: ${mainHeaderHeight};
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

export default PageContainer;
