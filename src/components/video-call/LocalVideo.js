import React from "react";
import styled from "styled-components";

const VideoWrapper = styled.div`
  box-sizing: content-box;
  overflow: hidden;
  background: black;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
`;

const LocalVideo = () => {
  return (
    <VideoWrapper>
      <Video autoPlay playsInline muted />
    </VideoWrapper>
  );
};

export default LocalVideo;