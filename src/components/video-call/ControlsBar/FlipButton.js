import React from "react";

import { ReactComponent as Button } from "../../../images/flip-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const FlipButton = props => {
  return (
    <ButtonWrapper>
      <Button onClick={props.onClick} />
    </ButtonWrapper>
  );
};

export default FlipButton;
