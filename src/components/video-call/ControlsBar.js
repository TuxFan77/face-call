import React from "react";
import styled from "styled-components";

import { ReactComponent as CallButton } from "../../images/hang-up-button.svg";

const Bar = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 5rem;
  bottom: 0;
  border-radius: 5px 5px 0 0;
  background: rgba(255, 255, 255, 0.2);
  height: 7rem;
`;

const ControlsBar = props => {
  const { buttonSize } = props;
  return (
    <Bar>
      <CallButton width={buttonSize} height={buttonSize} />
    </Bar>
  );
};

ControlsBar.defaultProps = {
  buttonSize: "5rem"
};

export default ControlsBar;
