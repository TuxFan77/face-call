import React from "react";

import { ReactComponent as SpeakerOffButton } from "../../../images/speaker-off-button.svg";
import { ReactComponent as SpeakerOnButton } from "../../../images/speaker-on-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const SpeakerButton = ({ onClick, muted }) => {
  return (
    <ButtonWrapper>
      {muted ? (
        <SpeakerOffButton onClick={onClick} />
      ) : (
        <SpeakerOnButton onClick={onClick} />
      )}
    </ButtonWrapper>
  );
};

export default SpeakerButton;
