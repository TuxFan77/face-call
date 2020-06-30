import React, { useState } from "react";
import styled from "styled-components";

import Card from "../../styles/global/Card";
import CardContent from "../../styles/global/CardContent";
import Input from "../../styles/global/Input";
import LargeButton from "../../styles/global/LargeButton";

const Heading = styled.h1`
  margin-bottom: 3rem;
`;

const Instruction = styled.h2`
  /* margin-bottom: 3rem; */
`;

const Label = styled.label`
  /* margin-bottom: 1em; */
  margin-left: 0.2em;
`;

const InputField = styled(Input)`
  margin: 3rem 0;
`;

const RecipientEntryCard = ({ handleRecipientEntry }) => {
  const [recipient, setRecipient] = useState("");

  return (
    <Card width="50%">
      <CardContent>
        <Heading>Step 2</Heading>
        <Instruction>Enter your first recipient:</Instruction>
        <Label>e-mail or text capable cell number</Label>
        <InputField
          type="text"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
        />
        <LargeButton
          to="/sendInvites"
          onClick={() => handleRecipientEntry(recipient)}
        >
          Next
        </LargeButton>
      </CardContent>
    </Card>
  );
};

export default RecipientEntryCard;
