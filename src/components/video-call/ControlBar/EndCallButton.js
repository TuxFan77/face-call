import React from "react";

import { ReactComponent as Button } from "../../../images/hang-up-button.svg";
import ButtonWrapper from "./ButtonWrapper";

const EndCallButton = () => {
  return (
    <ButtonWrapper event={"END"} title={"End the call"}>
      <Button />
    </ButtonWrapper>
  );
};

export default EndCallButton;
