import styled from "styled-components";
import { mainFontFamily } from "../constants/fonts";

const Input = styled.input`
  border-radius: 9999px;
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  font-size: 1.5rem;
  font-family: ${mainFontFamily};
  padding: 0.5rem 1.5rem;

  &:focus {
    outline-style: none;
  }
`;

export default Input;
