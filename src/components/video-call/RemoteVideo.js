import React from "react";
import styled from "styled-components";

const Video = styled.video`
  height: 100%;
  background: black;
`;

const RemoteVideo = React.forwardRef((props, ref) => {
  return (
    <Video autoPlay playsInline ref={ref} onPlay={props.handleStartPlayback} />
  );
});

export default RemoteVideo;
