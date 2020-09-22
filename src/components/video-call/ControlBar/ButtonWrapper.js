import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 225ms ease-in-out;
  & > * {
    pointer-events: none;
  }
  @media (hover: hover) {
    &:hover,
    &:focus {
      transform: scale(1.4) translateY(-0.5rem);
    }
  }
`;

const ButtonWrapper = ({ event, title, children }) => {
  return (
    <Wrapper data-event={event} title={title}>
      {children}
    </Wrapper>
  );
};

export default ButtonWrapper;
