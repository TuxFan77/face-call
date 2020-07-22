import React from "react";

import { ReactComponent as Button } from "../../../images/hang-up-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const EndCallButton = props => {
  return (
    <ButtonWrapper>
      <Button onClick={props.onClick} />
    </ButtonWrapper>
  );
};

export default EndCallButton;
