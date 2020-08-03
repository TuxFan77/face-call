import React from "react";

import { ReactComponent as SpeakerOffButton } from "../../../images/speaker-off-button.svg";
import { ReactComponent as SpeakerOnButton } from "../../../images/speaker-on-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const SpeakerButton = ({ buttonType, speakerMuted }) => {
  return (
    <ButtonWrapper buttonType={buttonType}>
      {speakerMuted ? <SpeakerOffButton /> : <SpeakerOnButton />}
    </ButtonWrapper>
  );
};

export default SpeakerButton;
