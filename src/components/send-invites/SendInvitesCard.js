import React from "react";
import styled from "styled-components";

import Card from "../common/Card";
import CardContent from "../common/CardContent";
import LinkButton from "../common/LinkButton";
import sendSms from "../../communication/sendSms";

const PATH = "/videoCall";

const Heading = styled.h1`
  margin-bottom: 3rem;
`;

const SendInvitesCard = ({ caller, recipient }) => {
  const message = `${caller} has sent you a video call invitation.
Click here to join the call:

${window.origin}${PATH}`;

  function handleClick() {
    if (recipient.type === "sms") {
      return sendSms({
        message,
        to: recipient.contact,
      });
    }

    if (recipient.type === "email") {
      return console.log(
        `Contacting recipient via ${recipient.type} at ${recipient.contact}`
      );
    }
  }

  return (
    <Card>
      <CardContent>
        <Heading>Step 3</Heading>
        <h2>Send invite and start your call.</h2>
        <p>Sending to {recipient.contact}:</p>
        <p>{message}</p>
        <LinkButton onClick={handleClick} to="/videoCall">
          Go!
        </LinkButton>
      </CardContent>
    </Card>
  );
};

export default SendInvitesCard;
