import React from "react";

import { ReactComponent as Button } from "../../../images/mic-off-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const MicButton = props => {
  return (
    <ButtonWrapper>
      <Button onClick={props.onClick} />
    </ButtonWrapper>
  );
};

export default MicButton;
