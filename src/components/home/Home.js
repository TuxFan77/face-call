import React from "react";

import PageContainer from "../../styles/global/PageContainer";
import GetStarted from "./GetStarted";
import VideoCallIllustration from "./HomeIllustration";

const Home = () => {
  return (
    <PageContainer>
      <GetStarted />
      <VideoCallIllustration />
    </PageContainer>
  );
};

export default Home;
