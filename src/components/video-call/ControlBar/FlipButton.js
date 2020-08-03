import React from "react";

import { ReactComponent as Button } from "../../../images/flip-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const FlipButton = ({ buttonType }) => {
  return (
    <ButtonWrapper buttonType={buttonType}>
      <Button />
    </ButtonWrapper>
  );
};

export default FlipButton;
