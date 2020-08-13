import React from "react";

import { DescriptionContainer, List } from "./DescriptionStyles";
import Button from "../../styles/global/Button";

const Description = () => {
  return (
    <DescriptionContainer>
      <h1>Video calling in your web browser</h1>
      <List>
        <li>No install</li>
        <li>No signup</li>
        <li>Free to use</li>
      </List>

      <Button to="/enterName">Get Started</Button>
    </DescriptionContainer>
  );
};

export default Description;
