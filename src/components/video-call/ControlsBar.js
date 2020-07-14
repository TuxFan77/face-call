import React from "react";
import styled from "styled-components";

import { ReactComponent as CallButton } from "../../images/hang-up-button.svg";
import { ReactComponent as MuteButton } from "../../images/mute-button.svg";
import { ReactComponent as FlipButton } from "../../images/flip-button.svg";

const Bar = styled.div`
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90vw;
  @media screen and (min-width: 768px) {
    width: 40vw;
  }
  bottom: 0;
  border-radius: 0.75rem 0.75rem 0 0;
  background: rgba(255, 255, 255, 0.2);
  height: 7rem;
`;

const ControlsBar = props => {
  const { buttonSize } = props;
  return (
    <Bar>
      <MuteButton width={buttonSize} height={buttonSize} />
      <FlipButton width={buttonSize} height={buttonSize} />
      <CallButton width={buttonSize} height={buttonSize} />
    </Bar>
  );
};

ControlsBar.defaultProps = {
  buttonSize: "5rem"
};

export default ControlsBar;
