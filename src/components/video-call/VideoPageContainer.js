import styled from "styled-components";
import { motion } from "framer-motion";

import { mainHeaderHeight } from "../../styles/sizes";

const VideoPageContainer = styled(motion.div)`
  position: fixed;
  width: 100%;
  top: ${mainHeaderHeight};
  bottom: 0;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default VideoPageContainer;
