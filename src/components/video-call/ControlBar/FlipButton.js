import React from "react";

import { ReactComponent as Button } from "../../../images/flip-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const FlipButton = () => {
  return (
    <ButtonWrapper event={"FLIP"} title={"Switch cameras"}>
      <Button />
    </ButtonWrapper>
  );
};

export default FlipButton;
