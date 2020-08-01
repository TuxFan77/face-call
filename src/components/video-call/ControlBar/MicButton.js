import React from "react";

import { ReactComponent as MicOnButton } from "../../../images/mic-on-button.svg";
import { ReactComponent as MicOffButton } from "../../../images/mic-off-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const MicButton = ({ onClick, micMuted }) => {
  return (
    <ButtonWrapper>
      {micMuted ? (
        <MicOffButton onClick={onClick} />
      ) : (
        <MicOnButton onClick={onClick} />
      )}
    </ButtonWrapper>
  );
};

export default MicButton;
