import styled from "styled-components";
import { motion } from "framer-motion";

import { mainHeaderHeight } from "../../styles/sizes";

const VideoPageContainer = styled(motion.div)`
  position: fixed;
  z-index: 1000;
  width: 100%;
  top: ${mainHeaderHeight};
  bottom: 0;
  background: black;
  display: flex;
  justify-content: center;
`;
export default VideoPageContainer;
