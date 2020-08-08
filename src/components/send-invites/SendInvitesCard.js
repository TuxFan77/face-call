import React from "react";
import styled from "styled-components";

import Card from "../../styles/global/Card";
import CardContent from "../../styles/global/CardContent";
import LargeButton from "../../styles/global/LargeButton";
import sendSms from "../../communication/sendSms";

const PATH = "/videoCall?isCaller=true";

const Heading = styled.h1`
  margin-bottom: 3rem;
`;

// const RecipientList = styled.ul`
//   font-size: 1.5rem;
//   margin: 1.5rem 0;
// `;

const SendInvitesCard = ({ caller, recipients }) => {
  const message = `Video call invitation from ${caller}.
Click here to join the call:
${window.origin}${PATH}`;

  return (
    <Card>
      <CardContent>
        <Heading>Step 3</Heading>
        <h2>Send invite and start your call.</h2>
        <p>
          Sending the following text message to your recipient at{" "}
          {recipients[0]}:
        </p>
        <p>{message}</p>
        {/* <RecipientList>
          {recipients.map((recipient, i) => (
            <li key={i}>{recipient}</li>
          ))}
        </RecipientList> */}
        <LargeButton
          onClick={() => {
            sendSms({
              message,
              to: recipients[0]
            });
          }}
          to="/videoCall"
        >
          Go!
        </LargeButton>
      </CardContent>
    </Card>
  );
};

export default SendInvitesCard;
