import React from "react";
import styled from "styled-components";

import BaseCard from "../../styles/global/Card";
import InfoContainer from "../../styles/global/InfoContainer";
import TextInput from "../../styles/global/TextInput";
import LargeButton from "../../styles/global/LargeButton";

const Card = styled(BaseCard)`
  width: 50%;
  padding: 2.5rem 3rem;
  p {
    font-size: 2.25rem;
  }
`;

const CardContent = styled(InfoContainer)`
  p {
    margin: 3rem 0;
  }

  input {
    margin-bottom: 3rem;
  }
`;

const EntryCard = () => {
  return (
    <Card>
      <CardContent alignLeft>
        <h1>Step 1</h1>
        <p>Enter your name:</p>
        <TextInput />
        <LargeButton>Next</LargeButton>
      </CardContent>
    </Card>
  );
};

export default EntryCard;
