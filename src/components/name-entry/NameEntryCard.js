import React, { useState } from "react";
import styled from "styled-components";

import Card from "../../styles/global/Card";
import CardContent from "../../styles/global/CardContent";
import Input from "../../styles/global/Input";

import {
  primaryGradient,
  primaryFontColor
} from "../../styles/constants/colors";
import { mainFontFamily, primaryFontSize } from "../../styles/constants/fonts";

const Button = styled.input`
  background: ${primaryGradient};
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  cursor: pointer;
  padding: 0.15em 0;
  font-size: ${primaryFontSize};
  font-family: ${mainFontFamily};
  color: ${primaryFontColor};
  width: 100%;

  &:focus {
    outline-style: dotted;
  }

  &:active,
  &:visited {
    color: ${primaryFontColor};
  }
`;

const Heading = styled.h1`
  margin-bottom: 3rem;
`;

const InputField = styled(Input)`
  margin: 3rem 0;
`;

const NameEntryCard = ({ name, handleNameEntry }) => {
  const [callerName, setName] = useState(name);

  return (
    <Card>
      <CardContent>
        <Heading>Step 1</Heading>
        <form>
          <label>
            <h2>Enter your name:</h2>
          </label>
          <InputField
            type="text"
            value={callerName}
            onChange={e => setName(e.target.value)}
          />
          <Button type="submit" value="Next" />
        </form>
      </CardContent>
    </Card>
  );
};

export default NameEntryCard;
