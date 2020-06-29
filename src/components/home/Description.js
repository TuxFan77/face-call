import React from "react";

import { DescriptionContainer, List } from "./DescriptionStyles";
import LargeButton from "../../styles/global/LargeButton";

const Description = () => {
  return (
    <DescriptionContainer>
      <h1>Video calling in your web browser</h1>
      <List>
        <li>No install</li>
        <li>No signup</li>
        <li>Free to use</li>
      </List>

      <LargeButton to="/enterName">Get Started</LargeButton>
    </DescriptionContainer>
  );
};

export default Description;
