import React from "react";

import { ReactComponent as Button } from "../../../images/speaker-off-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const SpeakerButton = props => {
  return (
    <ButtonWrapper>
      <Button onClick={props.onClick} />
    </ButtonWrapper>
  );
};

export default SpeakerButton;
