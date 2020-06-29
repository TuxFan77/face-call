import React from "react";
import styled from "styled-components";

import Card from "../../styles/global/Card";
import CardContent from "../../styles/global/CardContent";
import Input from "../../styles/global/Input";
import LargeButton from "../../styles/global/LargeButton";

const Heading = styled.h1`
  margin-bottom: 3rem;
`;

const InputField = styled(Input)`
  margin: 3rem 0;
`;

const RecipientEntryCard = () => {
  return (
    <Card width="50%">
      <CardContent>
        <Heading>Step 2</Heading>
        <p>Enter first recipient:</p>
        <InputField type="text" />
        <LargeButton to="/">Next</LargeButton>
      </CardContent>
    </Card>
  );
};

export default RecipientEntryCard;
