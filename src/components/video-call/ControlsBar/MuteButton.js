import React from "react";

import { ReactComponent as Button } from "../../../images/mute-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const MuteButton = props => {
  return (
    <ButtonWrapper>
      <Button onClick={props.onClick} />
    </ButtonWrapper>
  );
};

export default MuteButton;
