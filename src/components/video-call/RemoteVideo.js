import React, { useEffect } from "react";
import styled from "styled-components";

const Video = styled.video`
  @media screen and (orientation: landscape) {
    height: 100%;
  }
  @media screen and (orientation: portrait) {
    width: 100%;
  }
  background: black;
`;

const RemoteVideo = React.forwardRef((props, ref) => {
  // Explicitly set the "muted" attribute on the DOM element so Safari will autoplay
  useEffect(() => ref.current.setAttribute("muted", "true"));
  return <Video autoPlay playsInline muted ref={ref} />;
});

export default RemoteVideo;
