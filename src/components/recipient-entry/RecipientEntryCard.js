import React, { useState } from "react";
import styled from "styled-components";

import Card from "../../styles/global/Card";
import CardContent from "../../styles/global/CardContent";
import Input from "../../styles/global/Input";
import LargeButton from "../../styles/global/LargeButton";

const Heading = styled.h1`
  margin-bottom: 1.5rem;
`;

const Instruction = styled.h2`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  /* margin-bottom: 1em; */
  margin-left: 0.2em;
`;

const InputField = styled(Input)`
  margin: 1.5rem 0 3rem 0;
`;

const RecipientEntryCard = ({ handleRecipientEntry }) => {
  const [recipient, setRecipient] = useState("");

  return (
    <Card width="50%">
      <CardContent>
        <Heading>Step 2</Heading>
        <Instruction>Enter your recipient's mobile number:</Instruction>
        <Label>Must be able to receive texts</Label>
        <InputField
          type="tel"
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
