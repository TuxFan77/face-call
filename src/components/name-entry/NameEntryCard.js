import React, { useState, useRef } from "react";
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

const NameEntryCard = ({ name, handleNameEntry }) => {
  const [callerName, setName] = useState(name);

  const button = useRef(null);

  function handleEnterKey() {
    button.current.click();
  }

  return (
    <Card width="50%">
      <CardContent>
        <Heading>Step 1</Heading>
        <h2>Enter your name:</h2>
        <InputField
          type="text"
          value={callerName}
          onChange={e => setName(e.target.value)}
          onKeyUp={e => {
            if (e.keyCode === 13) handleEnterKey();
          }}
        />
        <LargeButton
          to="/enterRecipients"
          ref={button}
          disabled={callerName.length === 0}
          onClick={() => handleNameEntry(callerName)}
        >
          Next
        </LargeButton>
      </CardContent>
    </Card>
  );
};

export default NameEntryCard;
