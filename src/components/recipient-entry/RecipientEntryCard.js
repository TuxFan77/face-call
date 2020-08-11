import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Card from "../../styles/global/Card";
import CardContent from "../../styles/global/CardContent";
import Input from "../../styles/global/Input";
import SubmitButton from "../../styles/global/SubmitButton";
import RadioSelect from "./RadioSelect";
import { phoneRegEx, emailRegEx } from "./RegEx";

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
          <Instruction>Contact your recipient via:</Instruction>
          <Options>
            <RadioSelect name="contact" checked>
              Text
            </RadioSelect>
            <RadioSelect name="contact">Email</RadioSelect>
          </Options>
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

const Heading = styled.h1`
  margin-bottom: 1.5rem;
`;

const Instruction = styled.h2`
  margin-bottom: 1.5rem;
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    flex: 1;
  }
`;

const InputField = styled(Input)`
  margin: 1.5rem 0 3rem 0;
`;

export default RecipientEntryCard;
