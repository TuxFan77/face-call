import React from "react";

import { ReactComponent as SpeakerOffButton } from "../../../images/speaker-off-button.svg";
import { ReactComponent as SpeakerOnButton } from "../../../images/speaker-on-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const SpeakerButton = ({ speakerMuted }) => {
  return (
    <ButtonWrapper
      buttonType={"speaker"}
      title={speakerMuted ? "Unmute the speaker" : "Mute the speaker"}
    >
      {speakerMuted ? <SpeakerOffButton /> : <SpeakerOnButton />}
    </ButtonWrapper>
  );
};

export default SpeakerButton;
