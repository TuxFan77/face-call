import React from "react";
import styled from "styled-components";

import Card from "../../styles/global/Card";
import CardContent from "../../styles/global/CardContent";
import LargeButton from "../../styles/global/LargeButton";

const Heading = styled.h1`
  margin-bottom: 3rem;
`;

const RecipientList = styled.ul`
  font-size: 1.5rem;
  margin: 1.5rem 0;
`;

const SendInvitesCard = ({ caller, recipients }) => {
  console.log(caller, recipients);
  return (
    <Card>
      <CardContent>
        <Heading>Step 3</Heading>
        <h2>Send invites and start your call.</h2>
        <p>Your recipients will each receive the following message:</p>
        <p>
          You've received a video chat invite from {caller}. Click the following
          link to join the call:
        </p>
        <RecipientList>
          {recipients.map((recipient, i) => (
            <li key={i}>{recipient}</li>
          ))}
        </RecipientList>
        <LargeButton to="/videoCall?isCaller=true">Go!</LargeButton>
      </CardContent>
    </Card>
  );
};

export default SendInvitesCard;
