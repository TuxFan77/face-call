import styled from "styled-components";
import { mainFontFamily } from "../constants/fonts";

const TextInput = styled.input`
  border-radius: 9999px;
  border: 0.5px solid black;
  width: 100%;
  font-size: 1.5rem;
  font-family: ${mainFontFamily};
  padding: 0.5rem 1.5rem;

  &:focus {
    outline-style: none;
  }
`;

export default TextInput;
