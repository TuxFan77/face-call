import React from "react";

import PageContainer from "../common/PageContainer";
import HomeDescription from "./HomeDescription";
import HomeIllustration from "./HomeIllustration";
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
      <HomeDescription />
      <HomeIllustration />
    </PageContainer>
  );
};

export default Home;
