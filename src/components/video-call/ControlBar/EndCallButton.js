import React from "react";

import { ReactComponent as Button } from "../../../images/hang-up-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const EndCallButton = () => {
  return (
    <ButtonWrapper buttonType={"end"}>
      <Button />
    </ButtonWrapper>
  );
};

export default EndCallButton;
