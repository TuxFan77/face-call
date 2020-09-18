import React from "react";

import { ReactComponent as SpeakerOffButton } from "../../../images/speaker-off-button.svg";
import { ReactComponent as SpeakerOnButton } from "../../../images/speaker-on-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const SpeakerButton = ({ isSpeakerMuted }) => {
  return (
    <ButtonWrapper
      event={"TOGGLE_MUTE"}
      title={isSpeakerMuted ? "Unmute the speaker" : "Mute the speaker"}
    >
      {isSpeakerMuted ? <SpeakerOffButton /> : <SpeakerOnButton />}
    </ButtonWrapper>
  );
};

export default SpeakerButton;
