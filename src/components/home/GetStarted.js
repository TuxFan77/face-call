import React from "react";

import { InfoContainerCenteredHeadline, List } from "./GetStarted.styled";
import LargeButton from "../../styles/global/LargeButton";

const GetStarted = () => {
  return (
    <InfoContainerCenteredHeadline>
      <h1>Video calling in your web browser</h1>
      <List>
        <li>No install</li>
        <li>No signup</li>
        <li>Free to use</li>
      </List>
      <LargeButton>Get Started</LargeButton>
    </InfoContainerCenteredHeadline>
  );
};

export default GetStarted;
