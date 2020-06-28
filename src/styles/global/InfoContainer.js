import styled from "styled-components";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.alignLeft ? "flex-start" : "center")};
  justify-content: space-between;
`;

export default InfoContainer;
