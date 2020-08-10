import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Card from "../../styles/global/Card";
import CardContent from "../../styles/global/CardContent";
import Input from "../../styles/global/Input";
import SubmitButton from "../../styles/global/SubmitButton";
import { phoneRegEx, emailRegEx } from "./RegEx";

const Heading = styled.h1`
  margin-bottom: 1.5rem;
`;

const Instruction = styled.h2`
  margin-bottom: 1.5rem;
`;

const InputField = styled(Input)`
  margin: 1.5rem 0 3rem 0;
`;

const RecipientEntryCard = ({ recipient, handleRecipientEntry }) => {
  const [inputValue, setRecipient] = useState(recipient);
  // const [contactType, setContactType] = useState("");
  const history = useHistory();

  return (
    <Card width="50%">
      <CardContent>
        <Heading>Step 2</Heading>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleRecipientEntry(inputValue);
            history.push("/sendInvites");
          }}
        >
          <Instruction>
            Enter your recipient's mobile number or email address:
          </Instruction>
          <InputField
            autoFocus
            type="text"
            value={inputValue}
            onChange={e => setRecipient(e.target.value)}
          />
          <SubmitButton
            type="submit"
            disabled={
              !phoneRegEx.test(inputValue) && !emailRegEx.test(inputValue)
            }
            value="Next"
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default RecipientEntryCard;
