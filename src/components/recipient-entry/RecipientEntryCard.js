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
  const [inputValue, setRecipient] = useState(recipient.contact);
  const [contactMethod, setContactMethod] = useState(recipient.type);
  const history = useHistory();

  return (
    <Card width="50%">
      <CardContent>
        <Heading>Step 2</Heading>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleRecipientEntry({ contact: inputValue, type: contactMethod });
            history.push("/sendInvites");
          }}
        >
          <Instruction>Contact your recipient via:</Instruction>
          <RadioGroup onChange={e => setContactMethod(e.target.id)}>
            <RadioSelect
              id="sms"
              name="contact"
              checked={contactMethod === "sms"}
            >
              Text
            </RadioSelect>
            <RadioSelect
              id="email"
              name="contact"
              checked={contactMethod === "email"}
            >
              Email
            </RadioSelect>
          </RadioGroup>
          <Input
            style={{ margin: "1.5rem 0 3rem 0" }}
            type={contactMethod === "sms" ? "tel" : "email"}
            value={inputValue}
            onChange={e => setRecipient(e.target.value)}
          />
          <SubmitButton
            disabled={
              contactMethod === "sms"
                ? !phoneRegEx.test(inputValue)
                : !emailRegEx.test(inputValue)
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

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    flex: 1;
  }
`;

export default RecipientEntryCard;
