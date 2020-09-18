import React from "react";

import { ReactComponent as MicOnButton } from "../../../images/mic-on-button.svg";
import { ReactComponent as MicOffButton } from "../../../images/mic-off-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const MicButton = ({ isMicMuted }) => {
  return (
    <ButtonWrapper
      event={"TOGGLE_MIC"}
      title={isMicMuted ? "Unmute the microphone" : "Mute the microphone"}
    >
      {isMicMuted ? <MicOffButton /> : <MicOnButton />}
    </ButtonWrapper>
  );
};

export default MicButton;
