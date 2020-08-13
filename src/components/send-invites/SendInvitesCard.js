import React from "react";
import styled from "styled-components";

import Card from "../../styles/global/Card";
import CardContent from "../../styles/global/CardContent";
import Button from "../../styles/global/Button";
import sendSms from "../../communication/sendSms";

const PATH = "/videoCall";

const Heading = styled.h1`
  margin-bottom: 3rem;
`;

// const RecipientList = styled.ul`
//   font-size: 1.5rem;
//   margin: 1.5rem 0;
// `;

const SendInvitesCard = ({ caller, recipient }) => {
  const message = `${caller} has sent you a video call invitation.
Click here to join the call:

${window.origin}${PATH}`;

  function handleClick() {
    if (recipient.type === "sms") {
      return sendSms({
        message,
        to: recipient.contact
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
        {/* <RecipientList>
          {recipients.map((recipient, i) => (
            <li key={i}>{recipient}</li>
          ))}
        </RecipientList> */}
        <Button onClick={handleClick} to="/videoCall">
          Go!
        </Button>
      </CardContent>
    </Card>
  );
};

export default SendInvitesCard;
