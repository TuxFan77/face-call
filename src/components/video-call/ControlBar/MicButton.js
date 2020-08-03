import React from "react";

import { ReactComponent as MicOnButton } from "../../../images/mic-on-button.svg";
import { ReactComponent as MicOffButton } from "../../../images/mic-off-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const MicButton = ({ buttonType, micMuted }) => {
  return (
    <ButtonWrapper buttonType={buttonType}>
      {micMuted ? <MicOffButton /> : <MicOnButton />}
    </ButtonWrapper>
  );
};

export default MicButton;
