import { motion } from "framer-motion";
import styled from "styled-components";

import colors from "../../../styles/colors";

const Caption = styled(motion.p)`
  color: ${colors.white};
  text-align: center;
  margin: 1rem;
`;

export default Caption;
