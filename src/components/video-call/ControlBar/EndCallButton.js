import React from "react";

import { ReactComponent as Button } from "../../../images/hang-up-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const EndCallButton = ({ buttonType }) => {
  return (
    <ButtonWrapper buttonType={buttonType}>
      <Button />
    </ButtonWrapper>
  );
};

export default EndCallButton;
