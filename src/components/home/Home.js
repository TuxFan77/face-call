import React from "react";

import PageContainer from "../../styles/global/PageContainer";
import Description from "./Description";
import VideoCallIllustration from "./HomeIllustration";
import { pageVariants, pageTransition } from "../../animation/pageTransition";

const Home = () => {
  return (
    <PageContainer
      initial="in"
      animate="normal"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Description />
      <VideoCallIllustration />
    </PageContainer>
  );
};

export default Home;
