import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import colors from "../../styles/colors";

const Container = styled(motion.div)`
  position: absolute;
  margin-top: -2.5rem;
  display: flex;
  opacity: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Caption = styled(motion.p)`
  color: ${colors.white};
  opacity: 0;
  margin: 1rem;
`;

const Circle = styled(motion.div)`
  display: inline-block;
  background: ${colors.white};
  opacity: 0.8;
  width: 2.5rem;
  height: 2.5rem;
  margin: 1rem;
  border-radius: 50%;
`;

const AnimatedCircle = ({ position }) => {
  const duration = 1;
  const delay = (position * duration) / 3.5;
  const transition = {
    ease: "easeInOut",
    duration,
    delay,
    repeat: Infinity,
    repeatType: "reverse",
  };

  return (
    <Circle
      variants={{
        shrink: {
          scale: [0.6, 0.6, 1],
          transition,
        },
        grow: {
          scale: [1, 1, 0.6],
          transition,
        },
      }}
      initial="grow"
      animate="shrink"
    />
  );
};

const WaitingForPeer = () => {
  return (
    <Container animate={{ opacity: 1 }}>
      <Caption animate={{ opacity: 1, transition: { delay: 5 } }}>
        Waiting for other participant to connect
      </Caption>
      <div>
        <AnimatedCircle position={1} />
        <AnimatedCircle position={2} />
        <AnimatedCircle position={3} />
      </div>
    </Container>
  );
};

export default WaitingForPeer;
