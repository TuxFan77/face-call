import React from "react";
import styled from "styled-components";

const RadioSelect = ({ name, id, checked, children }) => {
  return (
    <Wrapper>
      <Label>
        <input type="radio" id={id} name={name} defaultChecked={checked} />
        {children}
      </Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  label,
  input {
    cursor: pointer;
  }
`;

const Label = styled.label`
  font-size: 1.5rem;

  input {
    margin-right: 1em;
  }
`;

export default RadioSelect;
