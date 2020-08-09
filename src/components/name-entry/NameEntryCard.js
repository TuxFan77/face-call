import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Card from "../../styles/global/Card";
import CardContent from "../../styles/global/CardContent";
import Input from "../../styles/global/Input";
import SubmitButton from "../../styles/global/SubmitButton";

const Heading = styled.h1`
  margin-bottom: 3rem;
`;

const NameEntryCard = ({ name, handleNameEntry }) => {
  const [callerName, setName] = useState(name);
  const history = useHistory();

  return (
    <Card>
      <CardContent>
        <Heading>Step 1</Heading>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleNameEntry(callerName);
            history.push("/enterRecipients");
          }}
        >
          <label htmlFor="name-input">
            <h2>Enter your name:</h2>
          </label>
          <Input
            style={{ margin: "3rem 0" }}
            type="text"
            id="name-input"
            autoComplete="off"
            value={callerName}
            onChange={e => setName(e.target.value)}
          />
          <SubmitButton
            type="submit"
            disabled={callerName.length === 0}
            value="Next"
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default NameEntryCard;
