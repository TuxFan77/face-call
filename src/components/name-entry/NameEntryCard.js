import React, { useState } from "react";
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

const NameEntryCard = ({ handleNameEntry }) => {
  const [name, setName] = useState("");

  return (
    <Card width="50%">
      <CardContent>
        <Heading>Step 1</Heading>
        <p>Enter your name:</p>
        <InputField type="text" onChange={e => setName(e.target.value)} />
        <LargeButton
          to="/enterRecipients"
          onClick={() => handleNameEntry(name)}
        >
          Next
        </LargeButton>
      </CardContent>
    </Card>
  );
};

export default NameEntryCard;
