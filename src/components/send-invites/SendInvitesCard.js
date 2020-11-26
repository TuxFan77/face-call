import React from "react";
import styled from "styled-components";
// import { v4 as uuidv4 } from "uuid";

import Card from "../common/Card";
import CardContent from "../common/CardContent";
import LinkButton from "../common/LinkButton";
import generateRandomHexString from "../../utils/generateRandomHexString";

// const room = uuidv4();
const ROOM_STRING_LENGTH = 6;
const room = generateRandomHexString(ROOM_STRING_LENGTH);
const PATH = `/videoCall`;

const Heading = styled.h1`
  margin-bottom: 3rem;
`;

const SendInvitesCard = () => {
  return (
    <Card>
      <CardContent>
        <Heading>Send Video Call Link</Heading>
        <p>
          Send this link to the other participant and then click the Go button.
        </p>
        <p>{`${window.origin}${PATH}/${room}`}</p>
        <LinkButton to={`${PATH}/${room}`}>Go!</LinkButton>
      </CardContent>
    </Card>
  );
};

export default SendInvitesCard;
